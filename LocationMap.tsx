
import React from 'react';

interface LocationMapProps {
  location: { lat: number; lng: number };
  address?: string;
}

const LocationMap: React.FC<LocationMapProps> = ({ location, address }) => {
  // In a real implementation, we would use a proper map library like Mapbox or Google Maps
  // For this demo, we'll just show a placeholder
  
  return (
    <div className="map-container relative">
      <div className="absolute inset-0 bg-gray-200 flex items-center justify-center">
        <div className="text-center">
          <div className="mb-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-gray-400 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </div>
          <p className="font-medium">Location: {location.lat.toFixed(4)}, {location.lng.toFixed(4)}</p>
          {address && <p className="text-sm text-gray-500">{address}</p>}
          <p className="text-xs text-gray-400 mt-2">Map integration will be available in a future update.</p>
        </div>
      </div>
    </div>
  );
};

export default LocationMap;
