import { ButtonHTMLAttributes, ReactNode } from 'react';
import { LuLoader } from 'react-icons/lu';


export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'destructive';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  icon?: ReactNode;
  iconPosition?: 'leading' | 'trailing';
  children?: ReactNode;
}

const variantClasses: Record<ButtonVariant, string> = {
  primary: 'bg-verde-500 hover:bg-verde-600 active:bg-verde-700 text-white shadow-sm',
  secondary: 'bg-neutral-100 hover:bg-neutral-200 active:bg-neutral-300 border border-neutral-300 text-neutral-700',
  ghost: 'text-verde-600 hover:bg-verde-50 active:bg-verde-100',
  destructive: 'border border-red-300 text-red-700 hover:bg-red-50 active:bg-red-100',
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: 'px-3 py-1.5 text-sm min-h-[36px]',
  md: 'px-4 py-2 text-base min-h-[44px]',
  lg: 'px-6 py-3 text-lg min-h-[48px]',
};

export default function Button({
  variant = 'secondary',
  size = 'md',
  loading = false,
  icon,
  iconPosition = 'leading',
  children,
  disabled,
  className = '',
  ...props
}: ButtonProps) {
  const isDisabled = disabled || loading;

  return (
    <button
      type="button"
      disabled={isDisabled}
      aria-busy={loading}
      className={`
        inline-flex items-center justify-center gap-2
        rounded-md font-medium
        transition-all duration-150
        active:scale-95
        focus-ring
        disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100
        ${variantClasses[variant]}
        ${sizeClasses[size]}
        ${className}
      `.trim().replace(/\s+/g, ' ')}
      {...props}
    >
      {loading && (
        <LuLoader className="animate-spin" size={size === 'sm' ? 14 : size === 'lg' ? 20 : 16} />
      )}
      {!loading && icon && iconPosition === 'leading' && (
        <span className="shrink-0">{icon}</span>
      )}
      {children && <span>{children}</span>}
      {!loading && icon && iconPosition === 'trailing' && (
        <span className="shrink-0">{icon}</span>
      )}
    </button>
  );
}

