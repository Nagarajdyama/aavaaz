
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, CheckCircle2, ChevronRight } from 'lucide-react';

interface HomeHeroSectionProps {
  isAuthenticated: boolean;
}

const HomeHeroSection: React.FC<HomeHeroSectionProps> = ({ isAuthenticated }) => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-gray-100 to-blue-50 py-16 md:py-24 border-b border-gray-200">
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      
      {/* Decorative elements */}
      <div className="absolute top-20 right-10 w-64 h-64 bg-aavaaz-navy/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-10 left-10 w-72 h-72 bg-aavaaz-green/5 rounded-full blur-3xl"></div>
      
      <div className="container mx-auto px-4 z-10 relative">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 text-center md:text-left mb-8 md:mb-0">
            <span className="inline-flex items-center px-3 py-1 rounded-full bg-aavaaz-green/10 text-aavaaz-green text-sm font-bold mb-4">
              <span className="animate-pulse mr-2">●</span> 
              Empowering citizens through technology
            </span>
            
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-6 text-aavaaz-navy leading-tight animate-fade-in">
              Your Voice <span className="text-aavaaz-green">Matters</span>
            </h1>
            <p className="text-xl mb-8 text-gray-700 max-w-lg">
              Aavaaz empowers citizens to report issues directly to government departments, track progress, and contribute to community improvement.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start mb-8">
              {isAuthenticated ? (
                <>
                  <Button asChild size="lg" className="bg-aavaaz-navy hover:bg-aavaaz-navy/90 shadow-lg hover:shadow-xl transition-all text-white font-bold">
                    <Link to="/new-complaint" className="flex items-center">
                      File a New Complaint
                      <ChevronRight className="ml-1 h-4 w-4" />
                    </Link>
                  </Button>
                  <Button asChild size="lg" variant="outline" className="border-aavaaz-navy text-aavaaz-navy hover:bg-aavaaz-navy/5 font-bold">
                    <Link to="/dashboard">
                      Go to Dashboard
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </>
              ) : (
                <>
                  <Button asChild size="lg" className="bg-aavaaz-navy hover:bg-aavaaz-navy/90 shadow-lg hover:shadow-xl transition-all text-white font-bold">
                    <Link to="/login" className="flex items-center">
                      Get Started
                      <ChevronRight className="ml-1 h-4 w-4" />
                    </Link>
                  </Button>
                  <Button asChild size="lg" variant="outline" className="border-aavaaz-navy text-aavaaz-navy hover:bg-aavaaz-navy/5 font-bold">
                    <Link to="/about">Learn More</Link>
                  </Button>
                </>
              )}
            </div>
            
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 text-sm">
              <div className="flex items-center px-3 py-2 bg-white rounded-full shadow-sm hover:shadow-md transition-all">
                <div className="bg-green-100 p-1 rounded-full mr-2">
                  <CheckCircle2 className="h-4 w-4 text-green-600" />
                </div>
                <span className="font-bold text-gray-800">Fast Response</span>
              </div>
              <div className="flex items-center px-3 py-2 bg-white rounded-full shadow-sm hover:shadow-md transition-all">
                <div className="bg-blue-100 p-1 rounded-full mr-2">
                  <CheckCircle2 className="h-4 w-4 text-blue-600" />
                </div>
                <span className="font-bold text-gray-800">Secure Process</span>
              </div>
              <div className="flex items-center px-3 py-2 bg-white rounded-full shadow-sm hover:shadow-md transition-all">
                <div className="bg-amber-100 p-1 rounded-full mr-2">
                  <CheckCircle2 className="h-4 w-4 text-amber-600" />
                </div>
                <span className="font-bold text-gray-800">Live Updates</span>
              </div>
            </div>
          </div>
          
          <div className="md:w-1/2 relative animate-fade-in">
            <div className="relative rounded-xl overflow-hidden shadow-2xl transform hover:scale-[1.01] transition-all duration-300 border border-gray-200">
              <img 
                src="https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=800&q=80" 
                alt="Aavaaz Complaint Platform" 
                className="w-full h-auto object-cover"
                style={{ minHeight: "340px" }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-aavaaz-navy/70 to-transparent flex items-end p-6">
                <p className="text-white text-lg font-bold">Making government services more accountable</p>
              </div>
              
              {/* Interactive overlay effect */}
              <div className="absolute inset-0 bg-aavaaz-navy/10 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center">
                <Button asChild variant="secondary" className="bg-white/90 hover:bg-white font-bold">
                  <Link to="/about">Learn How it Works</Link>
                </Button>
              </div>
            </div>
            
            {/* Floating stat badges */}
            <div className="absolute -top-4 -right-4 bg-white rounded-full shadow-lg p-3 flex items-center transform hover:scale-105 transition-transform">
              <span className="text-aavaaz-green font-extrabold text-xl mr-2">95%</span>
              <span className="text-xs font-bold text-gray-800">Complaints<br />Resolved</span>
            </div>
            <div className="absolute bottom-10 -left-6 bg-white rounded-full shadow-lg p-3 flex items-center transform hover:scale-105 transition-transform">
              <span className="text-aavaaz-navy font-extrabold text-xl mr-2">24hr</span>
              <span className="text-xs font-bold text-gray-800">Response<br />Time</span>
            </div>
            <div className="absolute top-1/2 -right-4 bg-white rounded-full shadow-lg p-3 flex items-center transform hover:scale-105 transition-transform">
              <span className="text-amber-500 font-extrabold text-xl mr-2">1K+</span>
              <span className="text-xs font-bold text-gray-800">Active<br />Users</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeHeroSection;
