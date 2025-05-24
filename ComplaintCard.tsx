
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import StatusBadge from './StatusBadge';
import { Complaint } from '@/types';

interface ComplaintCardProps {
  complaint: Complaint;
}

const ComplaintCard: React.FC<ComplaintCardProps> = ({ complaint }) => {
  const formatDate = (dateString: string | Date) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <Card className="overflow-hidden transition-all hover:shadow-md">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-lg">{complaint.title}</CardTitle>
            <CardDescription className="mt-1 text-sm">
              ID: {complaint.complaintId} • {formatDate(complaint.createdAt)}
            </CardDescription>
          </div>
          <StatusBadge status={complaint.status} />
        </div>
      </CardHeader>
      <CardContent className="pb-3 pt-0">
        <div className="flex flex-wrap gap-2 mb-3">
          <Badge variant="outline" className="bg-aavaaz-lightBlue text-aavaaz-navy">
            {complaint.complaintType === 'issue' ? 'Public Issue' : 'Individual Complaint'}
          </Badge>
          <Badge variant="outline" className="bg-aavaaz-lightBlue text-aavaaz-navy">
            {complaint.department?.name || 'Department'}
          </Badge>
          <Badge 
            variant="outline" 
            className={`${
              complaint.priority === 'high' || complaint.priority === 'urgent' 
                ? 'bg-red-100 text-red-800' 
                : 'bg-aavaaz-lightBlue text-aavaaz-navy'
            }`}
          >
            Priority: {complaint.priority.charAt(0).toUpperCase() + complaint.priority.slice(1)}
          </Badge>
        </div>
        <p className="text-sm line-clamp-2">{complaint.description}</p>
      </CardContent>
      <CardFooter className="pt-3">
        <Button asChild variant="default" size="sm" className="w-full bg-aavaaz-navy hover:bg-aavaaz-navy/90">
          <Link to={`/complaints/${complaint.id}`}>View Details</Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ComplaintCard;
