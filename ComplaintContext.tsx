
import React, { createContext, useState, useContext, ReactNode, useCallback } from 'react';
import { Complaint, ComplaintStatus, ComplaintType, Department } from '@/types';
import { complaints as initialComplaints, departments } from '@/data/mockData';
import { toast } from '@/components/ui/sonner';

interface ComplaintContextType {
  complaints: Complaint[];
  isLoading: boolean;
  error: Error | null;
  addComplaint: (complaint: Omit<Complaint, 'id' | 'complaintId' | 'createdAt' | 'updatedAt' | 'status'>) => Complaint;
  updateComplaint: (id: string, updates: Partial<Complaint>) => void;
  getComplaintById: (id: string) => Complaint | undefined;
  getUserComplaints: (userId: string) => Complaint[];
  getComplaintsByStatus: (status: ComplaintStatus) => Complaint[];
  getComplaintsByType: (type: ComplaintType) => Complaint[];
  getComplaintsByDepartment: (departmentId: string) => Complaint[];
  departments: Department[];
  refreshComplaints: () => Promise<void>;
}

const ComplaintContext = createContext<ComplaintContextType | undefined>(undefined);

interface ComplaintProviderProps {
  children: ReactNode;
}

export const ComplaintProvider: React.FC<ComplaintProviderProps> = ({ children }) => {
  const [complaints, setComplaints] = useState<Complaint[]>(initialComplaints);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  const refreshComplaints = useCallback(async () => {
    setIsLoading(true);
    try {
      // In a real app, this would be an API call
      // For now we'll just simulate a delay
      await new Promise(resolve => setTimeout(resolve, 500));
      setComplaints(initialComplaints);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to refresh complaints'));
      console.error('Error refreshing complaints:', err);
      toast.error("Failed to refresh complaints");
    } finally {
      setIsLoading(false);
    }
  }, []);

  const addComplaint = useCallback((complaintData: Omit<Complaint, 'id' | 'complaintId' | 'createdAt' | 'updatedAt' | 'status'>): Complaint => {
    try {
      const newComplaint: Complaint = {
        ...complaintData,
        id: Math.random().toString(36).substr(2, 9),
        complaintId: `AAV-${new Date().getFullYear()}-${(complaints.length + 1).toString().padStart(3, '0')}`,
        status: complaintData.complaintType === 'individual' ? 'verification_pending' : 'submitted',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        mediaUrls: complaintData.mediaUrls || [],
      };

      setComplaints((prev) => [...prev, newComplaint]);
      
      toast.success("Complaint Submitted", {
        description: `Complaint ID: ${newComplaint.complaintId}`,
      });

      return newComplaint;
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Failed to add complaint');
      setError(error);
      console.error('Error adding complaint:', err);
      toast.error("Failed to submit complaint");
      throw error;
    }
  }, [complaints.length]);

  const updateComplaint = useCallback((id: string, updates: Partial<Complaint>) => {
    try {
      setComplaints((prev) =>
        prev.map((complaint) => {
          if (complaint.id === id) {
            const updatedComplaint = {
              ...complaint,
              ...updates,
              updatedAt: new Date().toISOString(),
            };
            return updatedComplaint;
          }
          return complaint;
        })
      );
      
      toast.success("Complaint Updated", {
        description: "The complaint has been updated successfully.",
      });
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Failed to update complaint');
      setError(error);
      console.error('Error updating complaint:', err);
      toast.error("Failed to update complaint");
    }
  }, []);

  const getComplaintById = useCallback((id: string) => {
    return complaints.find((complaint) => complaint.id === id);
  }, [complaints]);

  const getUserComplaints = useCallback((userId: string) => {
    return complaints.filter((complaint) => complaint.userId === userId);
  }, [complaints]);

  const getComplaintsByStatus = useCallback((status: ComplaintStatus) => {
    return complaints.filter((complaint) => complaint.status === status);
  }, [complaints]);

  const getComplaintsByType = useCallback((type: ComplaintType) => {
    return complaints.filter((complaint) => complaint.complaintType === type);
  }, [complaints]);

  const getComplaintsByDepartment = useCallback((departmentId: string) => {
    return complaints.filter((complaint) => complaint.departmentId === departmentId);
  }, [complaints]);

  return (
    <ComplaintContext.Provider
      value={{
        complaints,
        isLoading,
        error,
        addComplaint,
        updateComplaint,
        getComplaintById,
        getUserComplaints,
        getComplaintsByStatus,
        getComplaintsByType,
        getComplaintsByDepartment,
        departments,
        refreshComplaints,
      }}
    >
      {children}
    </ComplaintContext.Provider>
  );
};

export const useComplaints = () => {
  const context = useContext(ComplaintContext);
  if (context === undefined) {
    throw new Error('useComplaints must be used within a ComplaintProvider');
  }
  return context;
};
