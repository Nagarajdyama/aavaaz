
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { 
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const HomeTestimonials: React.FC = () => {
  const testimonials = [
    {
      id: 1,
      name: "Rahul Sharma",
      role: "Resident, Delhi",
      content: "Aavaaz helped me get a broken streetlight fixed in just 3 days after months of trying through traditional channels. The department was responsive and kept me updated throughout.",
      image: null,
      initials: "RS"
    },
    {
      id: 2,
      name: "Priya Patel",
      role: "Community Leader, Mumbai",
      content: "Our neighborhood had a serious garbage collection issue for weeks. Through Aavaaz, we registered a complaint and received a permanent solution within a week. Incredible service!",
      image: null,
      initials: "PP"
    },
    {
      id: 3,
      name: "Mohammed Ali",
      role: "Teacher, Hyderabad",
      content: "The water supply in our school was contaminated. I reported it on Aavaaz and the Water Department responded immediately. They fixed the issue and even followed up later.",
      image: null,
      initials: "MA"
    },
    {
      id: 4,
      name: "Anjali Desai",
      role: "Business Owner, Bangalore",
      content: "The pothole outside my shop was causing accidents. After filing a complaint on Aavaaz, it was repaired within 48 hours. The platform works remarkably well!",
      image: null,
      initials: "AD"
    },
  ];
  
  return (
    <section className="py-16 bg-gray-100">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl font-bold mb-4 text-aavaaz-navy">Success Stories</h2>
          <p className="text-gray-700">
            Real citizens sharing their experiences with how Aavaaz helped resolve their issues.
          </p>
        </div>
        
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full max-w-5xl mx-auto"
        >
          <CarouselContent>
            {testimonials.map((testimonial) => (
              <CarouselItem key={testimonial.id} className="md:basis-1/2 lg:basis-1/3 pl-4">
                <Card className="border shadow-md hover:shadow-lg transition-shadow h-full bg-white">
                  <CardContent className="p-6 flex flex-col h-full">
                    <div className="mb-4">
                      <svg className="h-8 w-8 text-aavaaz-green opacity-60" fill="currentColor" viewBox="0 0 32 32">
                        <path d="M10.7 25.4c-1.2 0-2.3-0.5-3.2-1.4 -0.9-0.9-1.4-2-1.4-3.2 0-1.3 0.5-2.4 1.4-3.2 0.9-0.9 2-1.3 3.2-1.3 0.3 0 0.5 0 0.8 0.1 -0.4-1.1-0.9-2-1.7-2.8 -0.8-0.8-1.9-1.5-3.4-2.1l1.8-3.9c2.4 0.9 4.2 2.2 5.5 3.9 1.3 1.7 2 3.8 2 6.3 0 1.2-0.5 2.3-1.4 3.2C13 24.9 11.9 25.4 10.7 25.4zM21.3 25.4c-1.2 0-2.3-0.5-3.2-1.4 -0.9-0.9-1.4-2-1.4-3.2 0-1.3 0.5-2.4 1.4-3.2 0.9-0.9 2-1.3 3.2-1.3 0.3 0 0.5 0 0.8 0.1 -0.4-1.1-0.9-2-1.7-2.8 -0.8-0.8-1.9-1.5-3.4-2.1l1.8-3.9c2.4 0.9 4.2 2.2 5.5 3.9 1.3 1.7 2 3.8 2 6.3 0 1.2-0.5 2.3-1.4 3.2C23.6 24.9 22.5 25.4 21.3 25.4z"/>
                      </svg>
                    </div>
                    
                    <p className="text-gray-600 flex-grow mb-6">{testimonial.content}</p>
                    
                    <div className="flex items-center mt-auto">
                      <Avatar className="h-10 w-10 mr-3 border">
                        {testimonial.image ? (
                          <AvatarImage src={testimonial.image} />
                        ) : (
                          <AvatarFallback className="bg-aavaaz-navy text-white font-bold">
                            {testimonial.initials}
                          </AvatarFallback>
                        )}
                      </Avatar>
                      <div>
                        <h4 className="font-bold text-gray-900">{testimonial.name}</h4>
                        <p className="text-sm text-gray-600">{testimonial.role}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="flex justify-center mt-8">
            <CarouselPrevious className="relative static mr-2" />
            <CarouselNext className="relative static ml-2" />
          </div>
        </Carousel>
      </div>
    </section>
  );
};

export default HomeTestimonials;
