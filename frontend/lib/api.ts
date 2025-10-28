import { toast } from 'sonner';

// API Configuration
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/api';

export const apiConfig = {
  baseURL: API_BASE_URL,
};

// Generic fetch wrapper with error handling
export async function apiFetch<T>(
  endpoint: string,
  options?: RequestInit
): Promise<T> {
  const url = `${apiConfig.baseURL}${endpoint}`;
  
  const defaultHeaders = {
    'Content-Type': 'application/json',
  };

  try {
    const response = await fetch(url, {
      ...options,
      headers: {
        ...defaultHeaders,
        ...options?.headers,
      },
    });

    if (!response.ok) {
      const errorMessage = `API Error: ${response.status} ${response.statusText}`;
      toast.error(errorMessage);
      throw new Error(errorMessage);
    }

    return await response.json();
  } catch (error) {
    console.error('API Fetch Error:', error);
    if (error instanceof Error) {
      // Only show toast if we haven't already shown one
      if (!error.message.includes('API Error:')) {
        toast.error('Network error. Please check your connection.');
      }
    }
    throw error;
  }
}

// Example API methods
export const api = {
  // Gems
  getGems: () => apiFetch('/gems'),
  getGemById: (id: string) => apiFetch(`/gems/${id}`),
  
  // Krawls
  getKrawls: () => apiFetch('/krawls'),
  getKrawlById: (id: string) => apiFetch(`/krawls/${id}`),
  
  // Add more endpoints as needed
};