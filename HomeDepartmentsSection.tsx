
import React from 'react';
import { Department } from '@/types';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

interface HomeDepartmentsSectionProps {
  departments: Department[];
}

const HomeDepartmentsSection: React.FC<HomeDepartmentsSectionProps> = ({ departments }) => {
  // Take only the first 6 departments to display
  const displayedDepartments = departments.slice(0, 6);
  
  return (
    <section className="py-16 bg-gray-100">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl font-bold mb-4 text-aavaaz-navy">Government Departments</h2>
          <p className="text-gray-700">
            Aavaaz connects you directly with various government departments to resolve your issues efficiently.
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          {displayedDepartments.map((department) => (
            <div 
              key={department.id} 
              className="bg-white rounded-lg shadow-md p-6 hover:shadow-xl transition-shadow border-l-4 border-l-aavaaz-navy"
            >
              <div className="h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <span className="text-xl font-bold text-aavaaz-navy">
                  {department.name.charAt(0)}
                </span>
              </div>
              <h3 className="text-lg font-bold mb-2 text-gray-900">{department.name}</h3>
              <p className="text-gray-600 mb-4 line-clamp-2">{department.description}</p>
              <Link 
                to={`/new-complaint?dept=${department.id}`} 
                className="text-aavaaz-navy font-bold hover:underline text-sm inline-flex items-center"
              >
                Submit complaint
                <svg className="w-4 h-4 ml-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </Link>
            </div>
          ))}
        </div>
        
        {departments.length > 6 && (
          <div className="text-center">
            <Button asChild variant="outline" className="font-bold border-aavaaz-navy text-aavaaz-navy hover:bg-aavaaz-navy hover:text-white">
              <Link to="/departments">View All Departments</Link>
            </Button>
          </div>
        )}
      </div>
    </section>
  );
};

export default HomeDepartmentsSection;
