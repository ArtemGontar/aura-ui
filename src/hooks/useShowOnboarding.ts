import { useEffect, useState } from 'react';
import { UserData } from '../types/user'; // Adjust the import path as needed

const useShowOnboarding = (userData: UserData | null) => {
  const [showOnboarding, setShowOnboarding] = useState(false);

  useEffect(() => {
    setShowOnboarding(!userData?.dateOfBirth || !userData?.sex || !userData?.maritalStatus);
  }, [userData]);

  return showOnboarding;
};

export default useShowOnboarding;
