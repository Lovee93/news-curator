import { GoogleGenerativeAI } from "@google/generative-ai";
import express from "express";
import dotenv from "dotenv";
const app = express();

app.use(express.json());
dotenv.config();
const port = process.env.PORT || 3000;

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
let model;
let chat;

app.listen(port, async () => {
  console.log(`Server is running on port ${port}`);
  model = genAI.getGenerativeModel({
    model: "gemini-2.0-flash", // "gemini-2.5-pro-preview-03-25" or any latest model
    systemInstruction: "You are an expert news reporter who curates content and provides a brief to the point response in Australian slang. You do not give long paragraphs but just some bullet points with the summary.",
    tools: [{
      googleSearchRetrieval: {
        dynamicRetrievalConfig: {
          mode: "MODE_DYNAMIC",
          dynamicThreshold: 0.3,
        }
      }
    }],
    tools: [
      {"google_search": {}}
    ]
  });
  
});

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.get("/news", async (req, res) => {
  chat = await model.startChat();
  const prompt = "latest tech news in last 24 hours";
  const result = await chat.sendMessage(prompt);
  res.send(result.response.text());
})