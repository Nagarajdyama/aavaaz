
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText, MapPin, BarChart3, Clock, Shield, Megaphone } from 'lucide-react';

const HomeFeatureCards: React.FC = () => {
  const features = [
    {
      title: "Report Issues",
      description: "Submit detailed complaints about public services with supporting evidence.",
      icon: <FileText className="h-10 w-10 text-aavaaz-navy" />,
      color: "bg-blue-50 border-blue-200"
    },
    {
      title: "Track Progress",
      description: "Follow your complaint's journey with real-time status updates and notifications.",
      icon: <Clock className="h-10 w-10 text-amber-600" />,
      color: "bg-amber-50 border-amber-200"
    },
    {
      title: "Location Mapping",
      description: "Pinpoint exact locations on interactive maps for precise issue reporting.",
      icon: <MapPin className="h-10 w-10 text-green-600" />,
      color: "bg-green-50 border-green-200"
    },
    {
      title: "Department Routing",
      description: "Your complaints are automatically directed to the relevant government departments.",
      icon: <BarChart3 className="h-10 w-10 text-purple-600" />,
      color: "bg-purple-50 border-purple-200"
    },
    {
      title: "Secure Reporting",
      description: "File sensitive complaints with confidence using our secure, privacy-focused system.",
      icon: <Shield className="h-10 w-10 text-red-600" />,
      color: "bg-red-50 border-red-200"
    },
    {
      title: "Get Resolutions",
      description: "Receive official responses and solutions from government departments.",
      icon: <Megaphone className="h-10 w-10 text-indigo-600" />,
      color: "bg-indigo-50 border-indigo-200"
    }
  ];
  
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl font-bold mb-4 text-aavaaz-navy">How Aavaaz Works</h2>
          <p className="text-gray-700">
            Our platform streamlines the complaint process from submission to resolution, ensuring your voice is heard.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <Card key={index} className="border hover:shadow-lg transition-all duration-300 group">
              <CardHeader className={`${feature.color} rounded-t-lg p-6 border-b`}>
                <div className="mb-3">{feature.icon}</div>
                <CardTitle className="text-xl font-bold text-gray-900">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent className="p-6 bg-white">
                <CardDescription className="text-gray-600 text-base">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HomeFeatureCards;
