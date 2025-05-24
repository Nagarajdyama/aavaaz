
import React, { createContext, useContext, ReactNode, useState, useCallback, useMemo } from 'react';

interface AppState {
  isSidebarOpen: boolean;
  isSearchOpen: boolean;
  notifications: Notification[];
}

interface Notification {
  id: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  read: boolean;
  timestamp: string;
}

interface AppContextType {
  appState: AppState;
  toggleSidebar: () => void;
  toggleSearch: () => void;
  addNotification: (message: string, type: 'info' | 'success' | 'warning' | 'error') => void;
  markNotificationAsRead: (id: string) => void;
  clearAllNotifications: () => void;
  unreadNotificationsCount: number;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

interface AppProviderProps {
  children: ReactNode;
}

const initialState: AppState = {
  isSidebarOpen: false,
  isSearchOpen: false,
  notifications: [],
};

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [appState, setAppState] = useState<AppState>(initialState);

  // Calculate unread notifications count
  const unreadNotificationsCount = useMemo(() => 
    appState.notifications.filter(n => !n.read).length, 
    [appState.notifications]
  );

  const toggleSidebar = useCallback(() => {
    setAppState(prev => ({ ...prev, isSidebarOpen: !prev.isSidebarOpen }));
  }, []);

  const toggleSearch = useCallback(() => {
    setAppState(prev => ({ ...prev, isSearchOpen: !prev.isSearchOpen }));
  }, []);

  const addNotification = useCallback((message: string, type: 'info' | 'success' | 'warning' | 'error') => {
    const newNotification: Notification = {
      id: Math.random().toString(36).substring(2, 11),
      message,
      type,
      read: false,
      timestamp: new Date().toISOString(),
    };

    setAppState(prev => ({
      ...prev,
      notifications: [newNotification, ...prev.notifications].slice(0, 50), // Keep only most recent 50
    }));
  }, []);

  const markNotificationAsRead = useCallback((id: string) => {
    setAppState(prev => ({
      ...prev,
      notifications: prev.notifications.map(notification => 
        notification.id === id ? { ...notification, read: true } : notification
      ),
    }));
  }, []);

  const clearAllNotifications = useCallback(() => {
    setAppState(prev => ({
      ...prev,
      notifications: [],
    }));
  }, []);

  const contextValue = useMemo(() => ({
    appState,
    toggleSidebar,
    toggleSearch,
    addNotification,
    markNotificationAsRead,
    clearAllNotifications,
    unreadNotificationsCount,
  }), [
    appState, 
    toggleSidebar, 
    toggleSearch, 
    addNotification, 
    markNotificationAsRead, 
    clearAllNotifications, 
    unreadNotificationsCount
  ]);

  return (
    <AppContext.Provider value={contextValue}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppState = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppState must be used within an AppProvider');
  }
  return context;
};
