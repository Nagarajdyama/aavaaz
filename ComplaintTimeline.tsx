
import React from 'react';
import { 
  CheckCircle, 
  Clock, 
  AlertTriangle, 
  FileCheck, 
  UserCheck,
  Loader2,
  Check,
} from 'lucide-react';
import { ComplaintStatus } from '@/types';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';

interface TimelineEvent {
  status: ComplaintStatus;
  date: Date | string;
  description: string;
  icon: React.ReactNode;
  color: string;
}

interface ComplaintTimelineProps {
  complaint: {
    status: ComplaintStatus;
    createdAt: Date | string;
    updatedAt: Date | string;
  };
}

const ComplaintTimeline: React.FC<ComplaintTimelineProps> = ({ complaint }) => {
  // Create the timeline events based on complaint status
  const getEvents = (): TimelineEvent[] => {
    const submittedEvent: TimelineEvent = {
      status: 'submitted',
      date: complaint.createdAt,
      description: 'Your complaint has been submitted successfully.',
      icon: <FileCheck className="h-5 w-5" />,
      color: 'bg-blue-500',
    };

    const events: TimelineEvent[] = [submittedEvent];

    const statusOrder: ComplaintStatus[] = [
      'submitted',
      'verification_pending',
      'under_review',
      'assigned',
      'in_progress',
      'action_pending',
      'resolved',
      'closed',
    ];

    const statusIndex = statusOrder.indexOf(complaint.status);
    
    if (statusIndex >= 1 || complaint.status === 'verification_pending') {
      events.push({
        status: 'verification_pending',
        date: new Date(new Date(complaint.createdAt).getTime() + 1 * 24 * 60 * 60 * 1000),
        description: 'Your complaint is being verified by our team.',
        icon: <Loader2 className="h-5 w-5 animate-spin" />,
        color: 'bg-amber-500',
      });
    }

    if (statusIndex >= 2 || complaint.status === 'under_review') {
      events.push({
        status: 'under_review',
        date: new Date(new Date(complaint.createdAt).getTime() + 2 * 24 * 60 * 60 * 1000),
        description: 'Your complaint is under review by the department.',
        icon: <Clock className="h-5 w-5" />,
        color: 'bg-purple-500',
      });
    }

    if (statusIndex >= 3 || complaint.status === 'assigned') {
      events.push({
        status: 'assigned',
        date: new Date(new Date(complaint.createdAt).getTime() + 3 * 24 * 60 * 60 * 1000),
        description: 'An agent has been assigned to handle your complaint.',
        icon: <UserCheck className="h-5 w-5" />,
        color: 'bg-indigo-500',
      });
    }

    if (statusIndex >= 4 || complaint.status === 'in_progress') {
      events.push({
        status: 'in_progress',
        date: new Date(new Date(complaint.createdAt).getTime() + 5 * 24 * 60 * 60 * 1000),
        description: 'Work on resolving your complaint is in progress.',
        icon: <Loader2 className="h-5 w-5 animate-spin" />,
        color: 'bg-orange-500',
      });
    }

    if (statusIndex >= 5 || complaint.status === 'action_pending') {
      events.push({
        status: 'action_pending',
        date: new Date(new Date(complaint.createdAt).getTime() + 7 * 24 * 60 * 60 * 1000),
        description: 'Action is pending from the department.',
        icon: <AlertTriangle className="h-5 w-5" />,
        color: 'bg-yellow-500',
      });
    }

    if (statusIndex >= 6 || complaint.status === 'resolved') {
      events.push({
        status: 'resolved',
        date: complaint.status === 'resolved' ? complaint.updatedAt : new Date(),
        description: 'Your complaint has been resolved successfully.',
        icon: <CheckCircle className="h-5 w-5" />,
        color: 'bg-green-500',
      });
    }

    if (statusIndex >= 7 || complaint.status === 'closed') {
      events.push({
        status: 'closed',
        date: complaint.status === 'closed' ? complaint.updatedAt : new Date(),
        description: 'Your complaint has been closed.',
        icon: <Check className="h-5 w-5" />,
        color: 'bg-gray-500',
      });
    }

    if (complaint.status === 'rejected') {
      events.push({
        status: 'rejected',
        date: complaint.updatedAt,
        description: 'Your complaint has been rejected. Please check the details.',
        icon: <AlertTriangle className="h-5 w-5" />,
        color: 'bg-red-500',
      });
    }

    return events;
  };

  const events = getEvents();

  return (
    <div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-gray-300 before:to-transparent">
      {events.map((event, index) => {
        const isActive = event.status === complaint.status;
        const isPast = events.findIndex(e => e.status === complaint.status) > index;

        return (
          <div key={index} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
            <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white bg-white shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2">
              <span className={cn(
                "flex items-center justify-center w-7 h-7 rounded-full text-white",
                isActive ? event.color : isPast ? 'bg-green-500' : 'bg-gray-300'
              )}>
                {event.icon}
              </span>
            </div>
            
            <div className={cn(
              "w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded-lg shadow-md hover-lift",
              isActive ? "bg-white dark:bg-gray-800 border-l-4 border-l-blue-500" : 
              isPast ? "bg-white dark:bg-gray-800" : "bg-gray-100 dark:bg-gray-700"
            )}>
              <div className="flex items-center justify-between space-x-2 mb-1">
                <div className={cn(
                  "font-semibold",
                  isActive ? "text-blue-600 dark:text-blue-400" : 
                  isPast ? "text-green-600 dark:text-green-400" : "text-gray-600 dark:text-gray-400"
                )}>
                  {event.status.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                </div>
                <time className="text-xs font-medium text-gray-500 dark:text-gray-400">
                  {format(new Date(event.date), 'MMM d, yyyy')}
                </time>
              </div>
              <div className="text-sm">
                {event.description}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ComplaintTimeline;
