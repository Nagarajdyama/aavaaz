
import React, { createContext, useState, useContext, ReactNode, useCallback } from 'react';
import { SOSAlert } from '@/types';
import { sosAlerts as initialSOSAlerts } from '@/data/mockData';
import { toast } from '@/components/ui/sonner';

interface SOSContextType {
  sosAlerts: SOSAlert[];
  isLoading: boolean;
  error: Error | null;
  triggerSOS: (userId: string, userName: string, location?: { lat: number; lng: number }) => SOSAlert;
  updateSOSAlert: (id: string, updates: Partial<SOSAlert>) => void;
  getSOSAlertById: (id: string) => SOSAlert | undefined;
  getUserSOSAlerts: (userId: string) => SOSAlert[];
  getOpenSOSAlerts: () => SOSAlert[];
  refreshSOSAlerts: () => Promise<void>;
}

const SOSContext = createContext<SOSContextType | undefined>(undefined);

interface SOSProviderProps {
  children: ReactNode;
}

export const SOSProvider: React.FC<SOSProviderProps> = ({ children }) => {
  const [sosAlerts, setSOSAlerts] = useState<SOSAlert[]>(initialSOSAlerts);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  const refreshSOSAlerts = useCallback(async () => {
    setIsLoading(true);
    try {
      // In a real app, this would be an API call
      // For now we'll just simulate a delay
      await new Promise(resolve => setTimeout(resolve, 500));
      setSOSAlerts(initialSOSAlerts);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to refresh SOS alerts'));
      console.error('Error refreshing SOS alerts:', err);
      toast.error("Failed to refresh SOS alerts");
    } finally {
      setIsLoading(false);
    }
  }, []);

  const triggerSOS = useCallback((userId: string, userName: string, location?: { lat: number; lng: number }): SOSAlert => {
    try {
      const newAlert: SOSAlert = {
        id: Math.random().toString(36).substr(2, 9),
        userId,
        userName,
        timestampTriggered: new Date().toISOString(),
        status: 'new',
        locationAtTrigger: location,
      };

      setSOSAlerts((prev) => [...prev, newAlert]);
      
      toast.error("SOS Alert Triggered", {
        description: "Emergency services have been notified. Help is on the way.",
      });

      return newAlert;
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Failed to trigger SOS');
      setError(error);
      console.error('Error triggering SOS:', err);
      toast.error("Failed to trigger SOS alert");
      throw error;
    }
  }, []);

  const updateSOSAlert = useCallback((id: string, updates: Partial<SOSAlert>) => {
    try {
      setSOSAlerts((prev) =>
        prev.map((alert) => {
          if (alert.id === id) {
            return { ...alert, ...updates };
          }
          return alert;
        })
      );
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Failed to update SOS alert');
      setError(error);
      console.error('Error updating SOS alert:', err);
      toast.error("Failed to update SOS alert");
    }
  }, []);

  const getSOSAlertById = useCallback((id: string) => {
    return sosAlerts.find((alert) => alert.id === id);
  }, [sosAlerts]);

  const getUserSOSAlerts = useCallback((userId: string) => {
    return sosAlerts.filter((alert) => alert.userId === userId);
  }, [sosAlerts]);

  const getOpenSOSAlerts = useCallback(() => {
    return sosAlerts.filter((alert) => ['new', 'acknowledged'].includes(alert.status));
  }, [sosAlerts]);

  return (
    <SOSContext.Provider
      value={{
        sosAlerts,
        isLoading,
        error,
        triggerSOS,
        updateSOSAlert,
        getSOSAlertById,
        getUserSOSAlerts,
        getOpenSOSAlerts,
        refreshSOSAlerts,
      }}
    >
      {children}
    </SOSContext.Provider>
  );
};

export const useSOSAlerts = () => {
  const context = useContext(SOSContext);
  if (context === undefined) {
    throw new Error('useSOSAlerts must be used within a SOSProvider');
  }
  return context;
};
