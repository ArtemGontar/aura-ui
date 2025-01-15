export const getHoroscope = async (dateOfBirth: string): Promise<string> => {
  console.log("Mock getHoroscope called with:", dateOfBirth);
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("This is a mock horoscope based on your date of birth.");
    }, 1000);
  });
};