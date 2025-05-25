import { toast } from "@/components/ui/sonner";

export class AppError extends Error {
  constructor(
    message: string,
    public code?: string,
    public status?: number
  ) {
    super(message);
    this.name = 'AppError';
  }
}

export function handleError(error: unknown) {
  console.error('Error:', error);

  if (error instanceof AppError) {
    toast.error(error.message);
    return;
  }

  if (error instanceof Error) {
    toast.error(error.message);
    return;
  }

  toast.error('An unexpected error occurred');
}

export function isNetworkError(error: unknown): boolean {
  return error instanceof Error && 
    (error.name === 'NetworkError' || error.message.includes('network'));
}

export function isAuthError(error: unknown): boolean {
  return error instanceof AppError && 
    (error.status === 401 || error.status === 403);
}