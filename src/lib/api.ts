import { toast } from "@/components/ui/sonner";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '';

interface FetchOptions extends RequestInit {
  requiresAuth?: boolean;
}

async function fetchWithAuth(endpoint: string, options: FetchOptions = {}) {
  try {
    const { requiresAuth = true, ...fetchOptions } = options;
    
    const headers = new Headers(fetchOptions.headers);
    
    if (requiresAuth) {
      const token = localStorage.getItem('auth_token');
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
    }

    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...fetchOptions,
      headers,
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({}));
      throw new Error(error.message || 'An error occurred');
    }

    return await response.json();
  } catch (error) {
    console.error('API Error:', error);
    toast.error(error instanceof Error ? error.message : 'An error occurred');
    throw error;
  }
}

export const api = {
  get: (endpoint: string, options?: FetchOptions) => 
    fetchWithAuth(endpoint, { ...options, method: 'GET' }),
    
  post: (endpoint: string, data?: any, options?: FetchOptions) =>
    fetchWithAuth(endpoint, {
      ...options,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
      body: JSON.stringify(data),
    }),

  put: (endpoint: string, data?: any, options?: FetchOptions) =>
    fetchWithAuth(endpoint, {
      ...options,
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
      body: JSON.stringify(data),
    }),

  delete: (endpoint: string, options?: FetchOptions) =>
    fetchWithAuth(endpoint, { ...options, method: 'DELETE' }),
};