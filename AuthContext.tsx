
import React, { createContext, useContext, ReactNode, useCallback } from 'react';
import { User, UserRole } from '@/types';
import { users } from '@/data/mockData';
import { toast } from '@/components/ui/sonner';
import { useUser } from '@/hooks/useUser';

interface AuthContextType {
  currentUser: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  register: (name: string, email: string, password: string, role: UserRole) => Promise<boolean>;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: Error | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const { user: currentUser, setUser, clearUser, loading, error } = useUser();
  const isAuthenticated = !!currentUser;

  const login = useCallback(async (email: string, password: string): Promise<boolean> => {
    try {
      // For demo purposes, we're just checking if the email exists in our mock users
      const user = users.find((u) => u.email.toLowerCase() === email.toLowerCase());
      
      if (user) {
        setUser(user);
        toast.success(`Welcome back, ${user.name}!`);
        return true;
      } else {
        toast.error("Invalid email or password.");
        return false;
      }
    } catch (err) {
      console.error("Login error:", err);
      toast.error("Login failed. Please try again.");
      return false;
    }
  }, [setUser]);

  const register = useCallback(async (name: string, email: string, password: string, role: UserRole): Promise<boolean> => {
    try {
      // Check if user already exists
      const existingUser = users.find((u) => u.email.toLowerCase() === email.toLowerCase());
      if (existingUser) {
        toast.error("User with this email already exists.");
        return false;
      }

      // In a real app, this would be an API call to register the user
      const newUser: User = {
        id: `user-${Date.now()}`,
        name,
        email,
        role,
        avatarUrl: `https://i.pravatar.cc/150?img=${Math.floor(Math.random() * 70)}`,
      };

      // In a real app, would add to the database. For now just simulate
      // Add to mock users (this won't persist on refresh in this demo)
      users.push(newUser);
      
      // Auto login after registration
      setUser(newUser);
      toast.success("Registration successful!");
      return true;
    } catch (err) {
      console.error("Registration error:", err);
      toast.error("Registration failed. Please try again.");
      return false;
    }
  }, [setUser]);

  const logout = useCallback(() => {
    clearUser();
    toast.success("You have been successfully logged out.");
  }, [clearUser]);

  return (
    <AuthContext.Provider 
      value={{ 
        currentUser, 
        login, 
        logout,
        register,
        isAuthenticated,
        isLoading: loading,
        error 
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
