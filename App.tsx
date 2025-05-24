
import React, { Suspense } from "react";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { ComplaintProvider } from "./contexts/ComplaintContext";
import { SOSProvider } from "./contexts/SOSContext";
import { AppProvider } from "./contexts/AppContext";
import { ThemeProvider } from "./components/ThemeProvider";
import { Toaster as SonnerToaster } from "./components/ui/sonner";
import LoadingSpinner from "./components/common/LoadingSpinner";
import ErrorBoundary from "./components/ErrorBoundary";

// Lazy loaded components
const Index = React.lazy(() => import("./pages/Index"));
const LoginPage = React.lazy(() => import("./pages/LoginPage"));
const RegistrationPage = React.lazy(() => import("./pages/RegistrationPage"));
const DashboardPage = React.lazy(() => import("./pages/DashboardPage"));
const ComplaintsListPage = React.lazy(() => import("./pages/ComplaintsListPage"));
const ComplaintDetailPage = React.lazy(() => import("./pages/ComplaintDetailPage"));
const NewComplaintPage = React.lazy(() => import("./pages/NewComplaintPage"));
const AdminPage = React.lazy(() => import("./pages/AdminPage"));
const NotFound = React.lazy(() => import("./pages/NotFound"));
const AboutPage = React.lazy(() => import("./pages/AboutPage"));
const ContactPage = React.lazy(() => import("./pages/ContactPage"));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
      staleTime: 5 * 60 * 1000, // 5 minutes
    },
  },
});

const App = () => (
  <ThemeProvider>
    <QueryClientProvider client={queryClient}>
      <AppProvider>
        <AuthProvider>
          <ComplaintProvider>
            <SOSProvider>
              <BrowserRouter>
                <TooltipProvider>
                  <Toaster />
                  <SonnerToaster richColors closeButton />
                  <ErrorBoundary>
                    <Suspense fallback={<LoadingSpinner />}>
                      <Routes>
                        <Route path="/" element={<Index />} />
                        <Route path="/login" element={<LoginPage />} />
                        <Route path="/register" element={<RegistrationPage />} />
                        <Route path="/dashboard" element={<DashboardPage />} />
                        <Route path="/complaints" element={<ComplaintsListPage />} />
                        <Route path="/complaints/:id" element={<ComplaintDetailPage />} />
                        <Route path="/new-complaint" element={<NewComplaintPage />} />
                        <Route path="/admin" element={<AdminPage />} />
                        <Route path="/profile" element={<Navigate to="/dashboard" replace />} />
                        <Route path="/about" element={<AboutPage />} />
                        <Route path="/contact" element={<ContactPage />} />
                        <Route path="*" element={<NotFound />} />
                      </Routes>
                    </Suspense>
                  </ErrorBoundary>
                </TooltipProvider>
              </BrowserRouter>
            </SOSProvider>
          </ComplaintProvider>
        </AuthProvider>
      </AppProvider>
    </QueryClientProvider>
  </ThemeProvider>
);

export default App;
