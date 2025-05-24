
import React from 'react';
import { ComplaintStatus } from '@/types';

interface StatusBadgeProps {
  status: ComplaintStatus;
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  const getStatusClass = () => {
    switch (status) {
      case 'submitted':
        return 'status-submitted';
      case 'verification_pending':
        return 'status-verification';
      case 'under_review':
        return 'status-verification';
      case 'assigned':
        return 'status-inprogress';
      case 'in_progress':
        return 'status-inprogress';
      case 'action_pending':
        return 'status-inprogress';
      case 'resolved':
        return 'status-resolved';
      case 'closed':
        return 'status-resolved';
      case 'rejected':
        return 'status-rejected';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = () => {
    switch (status) {
      case 'verification_pending':
        return 'Verification Pending';
      case 'under_review':
        return 'Under Review';
      case 'in_progress':
        return 'In Progress';
      case 'action_pending':
        return 'Action Pending';
      default:
        return status.charAt(0).toUpperCase() + status.slice(1);
    }
  };

  return (
    <span className={`complaint-status-badge ${getStatusClass()}`}>
      {getStatusText()}
    </span>
  );
};

export default StatusBadge;
