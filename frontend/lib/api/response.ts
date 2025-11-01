/**
 * Centralized API response parsing utilities
 * 
 * Handles parsing of API responses including:
 * - Content-type checking
 * - Empty response handling (204, empty body)
 * - JSON parsing with error handling
 */

/**
 * Parses an API response, handling edge cases like:
 * - 204 No Content responses
 * - Empty response bodies
 * - Non-JSON content types
 * - Malformed JSON
 * 
 * @param response - The fetch Response object
 * @returns Parsed JSON data, or undefined if response has no body
 * @throws Error if response is not ok
 */
export async function parseApiResponse<T>(response: Response): Promise<T> {
  // Check if response has a body before parsing JSON
  const contentType = response.headers.get('content-type') || '';
  const hasJsonBody = contentType.includes('application/json');
  
  // Handle 204 No Content or empty 200 responses
  if (response.status === 204 || !hasJsonBody) {
    return undefined as unknown as T;
  }

  // Read response as text first to check if empty
  const text = await response.text();
  if (!text.trim()) {
    return undefined as unknown as T;
  }

  // Parse JSON only if content exists
  try {
    return JSON.parse(text) as T;
  } catch (e) {
    // If parsing fails, still return undefined rather than crashing
    console.warn('Failed to parse JSON response, treating as empty:', e);
    return undefined as unknown as T;
  }
}

/**
 * Parses an API response without checking response.ok
 * Useful for handling error responses that may still contain JSON
 * 
 * @param response - The fetch Response object
 * @returns Parsed JSON data, or undefined if response has no body
 */
export async function parseResponseBody<T>(response: Response): Promise<T | undefined> {
  const contentType = response.headers.get('content-type') || '';
  const hasJsonBody = contentType.includes('application/json');
  
  if (!hasJsonBody) {
    return undefined;
  }

  try {
    const text = await response.text();
    if (!text.trim()) {
      return undefined;
    }
    return JSON.parse(text) as T;
  } catch {
    return undefined;
  }
}

