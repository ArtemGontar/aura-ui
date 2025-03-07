import { useState, useEffect } from 'react';
import { ProfileData } from '../types';

export const useProfileData = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [profileData, setProfileData] = useState<ProfileData | null>(null);

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        setIsLoading(true);
        // TODO: Replace with actual API call
        const mockData: ProfileData = {
          name: "John Doe",
          email: "john.doe@example.com",
          avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRetqGORHJAzupIKNuFDrFOkfl0K0ux_bOEHw&s",
          subscribed: false,
          subscription: {
            plan: "Premium",
            expiration: "2025-01-31",
          },
          predictions: [
            { date: "2025-01-05", type: "Daily Horoscope", result: "Positive vibes await you today!" },
            { date: "2025-01-04", type: "Magic Ball", result: "Yes, the answer is clear!" },
            { date: "2025-01-03", type: "Astrology", result: "Your rising sign brings harmony to your relationships." },
          ],
        };
        
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        setProfileData(mockData);
      } catch (err) {
        setError('Failed to load profile data');
        console.error('Error fetching profile data:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfileData();
  }, []);

  const handleSubscribe = async () => {
    try {
      // TODO: Implement actual subscription logic
      if (profileData) {
        setProfileData({
          ...profileData,
          subscribed: true,
        });
      }
    } catch (err) {
      setError('Failed to subscribe');
      console.error('Error subscribing:', err);
    }
  };

  return {
    isLoading,
    error,
    profileData,
    handleSubscribe
  };
}; 