import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.GPT_API_KEY,
});

const openai = new OpenAIApi(configuration);

export const generateFortune = async (question: string): Promise<string> => {
  const response = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: question,
    max_tokens: 150,
    temperature: 0.7,
  });

  return response.data.choices[0]?.text?.trim() || "No fortune found.";
};
