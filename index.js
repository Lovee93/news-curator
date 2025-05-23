import { GoogleGenAI } from "@google/genai";
import express from "express";
import dotenv from "dotenv";
const app = express();

app.use(express.json());
dotenv.config();
const port = process.env.PORT || 3000;

const apiKey = process.env.GEMINI_API_KEY;
const geminiAI = new GoogleGenAI({apiKey});
const systemInstruction = "You are an expert news reporter who curates content and provides a brief to the point response in Australian slang. You do not give long paragraphs but just some bullet points with the summary."

app.listen(port, async () => {
  console.log(`Server is running on port ${port}`);  
});

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.get("/news", async (req, res) => {
  const prompt = "latest tech news in last 24 hours"
  // Initialize the chat with the model and tools
  const chat = await geminiAI.chats.create({
    model: "gemini-2.5-flash-preview-04-17",
    config: {
      tools: [
        {
          googleSearch: {}
        }
      ],
      systemInstruction
    }
  })
  // Send the prompt and wait for the result
  const result = await chat.sendMessage({"message": prompt})
  res.send(result.text);
})