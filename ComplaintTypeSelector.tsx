
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ComplaintType } from '@/types';

interface ComplaintTypeSelectorProps {
  selected: ComplaintType | null;
  onSelect: (type: ComplaintType) => void;
}

const ComplaintTypeSelector: React.FC<ComplaintTypeSelectorProps> = ({ selected, onSelect }) => {
  return (
    <div className="grid md:grid-cols-2 gap-4">
      <Card 
        className={`cursor-pointer transition-all hover:shadow-md ${selected === 'issue' ? 'border-2 border-aavaaz-navy' : ''}`}
        onClick={() => onSelect('issue')}
      >
        <CardHeader className="pb-3">
          <CardTitle>Report a Public Service Issue</CardTitle>
          <CardDescription>
            Report problems with infrastructure, utilities, or public services
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center h-24 bg-aavaaz-lightBlue rounded-md">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-aavaaz-navy" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
          </div>
          <ul className="mt-4 text-sm space-y-1">
            <li className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 text-aavaaz-green" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Roads & Infrastructure
            </li>
            <li className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 text-aavaaz-green" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Water & Sanitation
            </li>
            <li className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 text-aavaaz-green" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Electricity & Utilities
            </li>
          </ul>
        </CardContent>
      </Card>

      <Card 
        className={`cursor-pointer transition-all hover:shadow-md ${selected === 'individual' ? 'border-2 border-aavaaz-navy' : ''}`}
        onClick={() => onSelect('individual')}
      >
        <CardHeader className="pb-3">
          <CardTitle>Report an Issue Involving an Individual</CardTitle>
          <CardDescription>
            Report misconduct or concerns about specific government officials
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center h-24 bg-aavaaz-lightBlue rounded-md">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-aavaaz-navy" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
          <ul className="mt-4 text-sm space-y-1">
            <li className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 text-aavaaz-green" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Official Misconduct
            </li>
            <li className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 text-aavaaz-green" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Dereliction of Duty
            </li>
            <li className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 text-aavaaz-green" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Other Individual Issues
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export default ComplaintTypeSelector;
