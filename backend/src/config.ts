import dotenv from "dotenv";

dotenv.config();

export const config = {
  GPT_API_KEY: process.env.GPT_API_KEY || "",
};
