export const getHoroscope = async (dateOfBirth: string): Promise<string> => {
  console.log("Mock getHoroscope called with:", dateOfBirth);
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("This is a mock horoscope based on your date of birth.");
    }, 1000);
  });
};

export const getMagicBallAnswer = async (): Promise<string> => {
  const possibleAnswers = [
    "Yes",
    "No",
    "Maybe",
    "Ask again later",
    "Definitely",
    "I don't think so",
    "Absolutely",
    "Not sure",
    "Probably",
    "Unlikely",
  ];

  return new Promise((resolve) => {
    setTimeout(() => {
      const randomIndex = Math.floor(Math.random() * possibleAnswers.length);
      resolve(possibleAnswers[randomIndex]);
    }, 1000);
  });
};

export const getPsychologicalInsight = async (data: {
  focusArea: string;
  concern: string;
  emotionalState: string;
  goal: string;
  backgroundInfo: string;
}): Promise<string> => {
  const mockInsights = [
    "Your concern about your promotion is completely valid—it's natural to feel anxious when working hard toward a goal. However, the future is still unwritten, and there are many paths to success. Here's something to consider: Have you shared your aspirations with your manager directly? Open communication might clear up any misunderstandings. Remember, even if this opportunity doesn’t come immediately, your efforts are building a strong foundation for the future. Confidence grows from persistence, not perfection. Take it one step at a time, and trust that growth is happening even when it’s not immediately visible.",
    "You are a very empathetic person.",
    "You have a strong sense of justice.",
    "You are highly creative and imaginative.",
    "You are a natural leader.",
    "You have a calm and composed demeanor.",
  ];

  return new Promise((resolve) => {
    setTimeout(() => {
      const randomIndex = Math.floor(Math.random() * mockInsights.length);
      resolve(mockInsights[randomIndex]);
    }, 1000);
  });
};