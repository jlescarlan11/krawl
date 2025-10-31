'use client';

import { useEffect, useRef, useState, useCallback } from 'react';

declare global {
  interface Window {
    grecaptcha?: {
      ready: (callback: () => void) => void;
      render: (containerId: string, options: {
        sitekey: string;
        size: 'normal' | 'invisible';
        callback?: (token: string) => void;
      }) => number;
      execute: (widgetId: number) => void;
      reset: (widgetId: number) => void;
    };
  }
}

export interface UseRecaptchaOptions {
  /**
   * The reCAPTCHA site key from environment variables
   */
  siteKey?: string;
  /**
   * Whether to use visible (normal) or invisible CAPTCHA
   * Can be controlled via URL param ?captcha=visible for debugging
   */
  visible?: boolean;
  /**
   * Container ID for the reCAPTCHA widget
   */
  containerId: string;
  /**
   * Callback when a token is received
   */
  onToken?: (token: string) => void;
}

export interface UseRecaptchaReturn {
  /**
   * Whether reCAPTCHA is ready to use
   */
  isReady: boolean;
  /**
   * The current token (if available)
   */
  token: string | null;
  /**
   * Execute reCAPTCHA (for invisible mode)
   */
  execute: () => void;
  /**
   * Reset the reCAPTCHA widget
   */
  reset: () => void;
  /**
   * Container element props for rendering
   */
  containerProps: {
    id: string;
    style: React.CSSProperties;
  };
}

/**
 * Hook for managing Google reCAPTCHA integration
 * 
 * Handles script loading, widget rendering, and token management
 * for both visible and invisible CAPTCHA modes.
 * 
 * @example
 * ```tsx
 * const { isReady, execute, reset, containerProps } = useRecaptcha({
 *   siteKey: process.env.NEXT_PUBLIC_RECAPTCHA_SITEKEY,
 *   containerId: 'recaptcha-container',
 *   visible: urlParams.get('captcha') === 'visible',
 *   onToken: (token) => {
 *     // Handle token
 *   }
 * });
 * 
 * return (
 *   <>
 *     <div {...containerProps} />
 *     <button onClick={execute} disabled={!isReady}>
 *       Submit
 *     </button>
 *   </>
 * );
 * ```
 */
export function useRecaptcha(options: UseRecaptchaOptions): UseRecaptchaReturn {
  const { siteKey, visible = false, containerId, onToken } = options;
  const [isReady, setIsReady] = useState(false);
  const [token, setToken] = useState<string | null>(null);
  const widgetIdRef = useRef<number | null>(null);
  const onTokenRef = useRef(onToken);

  // Keep callback ref up to date
  useEffect(() => {
    onTokenRef.current = onToken;
  }, [onToken]);

  // Load reCAPTCHA script
  useEffect(() => {
    if (!siteKey) return;

    // Check if script already exists
    const existingScript = document.querySelector('script[src="https://www.google.com/recaptcha/api.js?render=explicit"]');
    if (!existingScript) {
      const script = document.createElement('script');
      script.src = 'https://www.google.com/recaptcha/api.js?render=explicit';
      script.async = true;
      document.body.appendChild(script);
    }
  }, [siteKey]);

  // Initialize widget when grecaptcha is available
  useEffect(() => {
    if (!siteKey) return;

    const checkAndRender = () => {
      if (window.grecaptcha && widgetIdRef.current === null) {
        try {
          window.grecaptcha.ready(() => {
            const id = window.grecaptcha!.render(containerId, {
              sitekey: siteKey,
              size: visible ? 'normal' : 'invisible',
              callback: (receivedToken: string) => {
                setToken(receivedToken);
                onTokenRef.current?.(receivedToken);
              },
            });
            widgetIdRef.current = id;
            setIsReady(true);
          });
        } catch (error) {
          console.error('Failed to render reCAPTCHA:', error);
        }
      }
    };

    // Poll until grecaptcha is available
    const interval = setInterval(() => {
      if (window.grecaptcha) {
        checkAndRender();
        clearInterval(interval);
      }
    }, 200);

    return () => clearInterval(interval);
  }, [siteKey, visible, containerId]);

  const execute = useCallback(() => {
    if (!isReady || !window.grecaptcha || widgetIdRef.current === null) {
      return;
    }
    try {
      window.grecaptcha.execute(widgetIdRef.current);
    } catch (error) {
      console.error('Failed to execute reCAPTCHA:', error);
    }
  }, [isReady]);

  const reset = useCallback(() => {
    if (!isReady || !window.grecaptcha || widgetIdRef.current === null) {
      return;
    }
    try {
      window.grecaptcha.reset(widgetIdRef.current);
      setToken(null);
    } catch (error) {
      console.error('Failed to reset reCAPTCHA:', error);
    }
  }, [isReady]);

  const containerProps = {
    id: containerId,
    style: {
      display: visible ? 'block' : 'none',
      marginBottom: visible ? 12 : 0,
    } as React.CSSProperties,
  };

  return {
    isReady,
    token,
    execute,
    reset,
    containerProps,
  };
}

