
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import './App.css'
import ErrorBoundary from './components/ErrorBoundary.tsx'

// Improved error logging
if (process.env.NODE_ENV === 'production') {
  console.error = (message: any, ...optionalParams: any[]) => {
    // Here you could integrate with a logging service like Sentry
    console.log('[ERROR]', message, ...optionalParams);
  };
}

createRoot(document.getElementById("root")!).render(
  <ErrorBoundary>
    <App />
  </ErrorBoundary>
);
