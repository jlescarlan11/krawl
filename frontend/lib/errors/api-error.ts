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
        errorData = await response.json();
      }
    } catch {
      // If parsing fails, use defaults
    }

    const fallbackByStatus: Record<number, string> = {
      400: 'Validation failed',
      401: 'Invalid email or password',
      403: 'Access denied',
      404: 'Resource not found',
      500: 'An unexpected error occurred. Please try again later.',
    };

    return new ApiError(
      response.status,
      errorData.message || fallbackByStatus[response.status] || response.statusText || 'An error occurred',
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

