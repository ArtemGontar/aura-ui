import express, { Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import { generateFortune } from "./gptClient";

dotenv.config();

const app = express();
const port = process.env.PORT || 8000;

app.use(cors());
app.use(express.json());

app.post("/api/fortune", async (req: Request, res: Response) => {
  const { question } = req.body;
  if (!question) {
    return res.status(400).json({ error: "Question is required" });
  }

  try {
    const response = await generateFortune(question);
    res.json({ response });
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
