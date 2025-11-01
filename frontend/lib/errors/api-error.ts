// API error handling

export interface ApiErrorResponse {
  message: string;
  status: number;
  errors?: Record<string, string[]>;
}

export class ApiError extends Error {
  constructor(
    public status: number,
    public message: string,
    public errors?: Record<string, string[]>
  ) {
    super(message);
    this.name = 'ApiError';
    // Maintains proper stack trace for where our error was thrown (only available on V8)
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, ApiError);
    }
  }

  static async fromResponse(response: Response): Promise<ApiError> {
    let errorData: Partial<ApiErrorResponse> = {};
    
    try {
      const contentType = response.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        // Clone response to avoid consuming the stream
        const clonedResponse = response.clone();
        const text = await clonedResponse.text();
        if (text.trim()) {
          try {
            errorData = JSON.parse(text);
            // Handle backend ErrorResponse structure (has both 'error' and 'message' fields)
            if (!errorData.message && (errorData as any).error) {
              errorData.message = (errorData as any).message || (errorData as any).error;
            }
          } catch (jsonError) {
            console.warn('Failed to parse error JSON:', jsonError, 'Response text:', text.substring(0, 200));
          }
        }
      }
    } catch (parseError) {
      // If parsing fails, log but continue with defaults
      console.warn('Failed to read error response:', parseError);
    }

    const fallbackByStatus: Record<number, string> = {
      400: 'Validation failed',
      401: 'Invalid email or password',
      403: 'Access denied',
      404: 'Resource not found',
      500: 'An unexpected error occurred. Please try again later.',
    };

    // Extract message, handling both 'message' and 'error' fields from backend
    const message = errorData.message 
      || (errorData as any).message 
      || (errorData as any).error 
      || fallbackByStatus[response.status] 
      || response.statusText 
      || 'An error occurred';
    
    return new ApiError(
      response.status,
      message,
      errorData.errors
    );
  }

  static fromNetworkError(error: unknown): ApiError {
    if (error instanceof TypeError && error.message.includes('fetch')) {
      return new ApiError(
        0,
        'Network error. Please check your connection.'
      );
    }
    
    if (error instanceof Error && error.message === 'OFFLINE') {
      return new ApiError(
        0,
        'OFFLINE'
      );
    }

    if (error instanceof Error && error.message === 'NETWORK_ERROR') {
      return new ApiError(
        0,
        'NETWORK_ERROR'
      );
    }

    return new ApiError(
      0,
      error instanceof Error ? error.message : 'An unknown error occurred'
    );
  }
}

