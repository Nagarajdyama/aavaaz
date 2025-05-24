
import React, { useState } from 'react';
import { useSOSAlerts } from '@/contexts/SOSContext';
import { useAuth } from '@/contexts/AuthContext';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger, AlertDialogDescription } from '@/components/ui/alert-dialog';

const SOSButton: React.FC = () => {
  const { triggerSOS } = useSOSAlerts();
  const { currentUser } = useAuth();
  const [location, setLocation] = useState<{ lat: number; lng: number } | undefined>(undefined);

  const handleTriggerSOS = () => {
    if (currentUser) {
      // Try to get user's location if they grant permission
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const userLocation = {
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            };
            setLocation(userLocation);
            triggerSOS(currentUser.id, currentUser.name, userLocation);
          },
          () => {
            // If location access is denied, proceed without location
            triggerSOS(currentUser.id, currentUser.name);
          }
        );
      } else {
        // If geolocation is not supported by the browser
        triggerSOS(currentUser.id, currentUser.name);
      }
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <button className="sos-button">
          <span className="font-bold">SOS</span>
        </button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Emergency Alert</AlertDialogTitle>
          <AlertDialogDescription>
            <p className="mb-2">
              This will send an emergency alert to the Aavaaz response team. Only use this if you are in immediate danger related to a complaint you have filed.
            </p>
            <p className="font-semibold">Are you sure you want to trigger an SOS alert?</p>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction 
            onClick={handleTriggerSOS}
            className="bg-aavaaz-errorRed hover:bg-red-600"
          >
            Confirm Emergency
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default SOSButton;
