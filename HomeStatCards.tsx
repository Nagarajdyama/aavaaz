
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { FileText, CheckCircle2, Clock, AlertTriangle } from 'lucide-react';

interface HomeStatCardsProps {
  totalComplaints: number;
  resolvedComplaints: number;
  pendingComplaints: number;
  urgentComplaints: number;
}

const HomeStatCards: React.FC<HomeStatCardsProps> = ({
  totalComplaints,
  resolvedComplaints,
  pendingComplaints,
  urgentComplaints
}) => {
  // Calculate percentage for progress bars
  const resolvedPercentage = totalComplaints ? Math.round((resolvedComplaints / totalComplaints) * 100) : 0;
  
  return (
    <section className="py-12 bg-gray-100 border-t border-b border-gray-200">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center text-aavaaz-navy">
          Making an Impact Together
        </h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="border-l-4 border-l-blue-500 hover:shadow-lg transition-shadow bg-white">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="bg-blue-100 p-3 rounded-full">
                  <FileText className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm font-bold text-gray-700">Total Complaints</p>
                  <p className="text-2xl font-bold text-gray-900">{totalComplaints.toLocaleString()}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-l-4 border-l-green-500 hover:shadow-lg transition-shadow bg-white">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="bg-green-100 p-3 rounded-full">
                  <CheckCircle2 className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <p className="text-sm font-bold text-gray-700">Resolved</p>
                  <p className="text-2xl font-bold text-gray-900">{resolvedComplaints.toLocaleString()}</p>
                </div>
              </div>
              <div className="mt-4">
                <div className="flex justify-between text-xs font-bold mb-1">
                  <span>Progress</span>
                  <span>{resolvedPercentage}%</span>
                </div>
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-green-500 rounded-full" 
                    style={{ width: `${resolvedPercentage}%` }}
                  ></div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-l-4 border-l-amber-500 hover:shadow-lg transition-shadow bg-white">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="bg-amber-100 p-3 rounded-full">
                  <Clock className="h-6 w-6 text-amber-600" />
                </div>
                <div>
                  <p className="text-sm font-bold text-gray-700">Pending</p>
                  <p className="text-2xl font-bold text-gray-900">{pendingComplaints.toLocaleString()}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-l-4 border-l-red-500 hover:shadow-lg transition-shadow bg-white">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="bg-red-100 p-3 rounded-full">
                  <AlertTriangle className="h-6 w-6 text-red-600" />
                </div>
                <div>
                  <p className="text-sm font-bold text-gray-700">Urgent Cases</p>
                  <p className="text-2xl font-bold text-gray-900">{urgentComplaints.toLocaleString()}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default HomeStatCards;
