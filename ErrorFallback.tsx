
import React from 'react';
import { Button } from '@/components/ui/button';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { AlertCircle, RefreshCw, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface ErrorFallbackProps {
  error: Error;
  resetErrorBoundary?: () => void;
  message?: string;
}

const ErrorFallback: React.FC<ErrorFallbackProps> = ({
  error,
  resetErrorBoundary,
  message = "Something went wrong"
}) => {
  const navigate = useNavigate();

  return (
    <div className="p-8 flex flex-col items-center justify-center min-h-[50vh] max-w-2xl mx-auto text-center">
      <div className="bg-red-100 text-red-700 p-4 rounded-full mb-6">
        <AlertCircle className="h-8 w-8" />
      </div>
      
      <h2 className="text-2xl font-bold text-red-800 mb-3">{message}</h2>
      
      <Alert variant="destructive" className="mb-6">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Error Details</AlertTitle>
        <AlertDescription className="mt-2">
          {error.message || "An unexpected error occurred."}
        </AlertDescription>
      </Alert>
      
      {process.env.NODE_ENV !== 'production' && (
        <div className="w-full mb-6">
          <details className="bg-red-50 border border-red-200 rounded-lg">
            <summary className="cursor-pointer p-3 font-medium text-red-600">
              Technical Details (Developer Only)
            </summary>
            <pre className="p-4 text-left text-sm text-red-700 overflow-auto max-h-[300px]">
              {error.stack}
            </pre>
          </details>
        </div>
      )}
      
      <div className="flex flex-wrap gap-4 justify-center">
        {resetErrorBoundary && (
          <Button 
            onClick={resetErrorBoundary} 
            className="flex items-center"
          >
            <RefreshCw className="mr-2 h-4 w-4" />
            Try Again
          </Button>
        )}
        
        <Button 
          variant="outline" 
          onClick={() => navigate(-1)}
          className="flex items-center"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Go Back
        </Button>
        
        <Button 
          variant="outline" 
          onClick={() => navigate('/')}
        >
          Go to Home
        </Button>
      </div>
    </div>
  );
};

export default ErrorFallback;
