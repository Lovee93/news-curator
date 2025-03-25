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
    model: "gemini-1.5-flash",
    systemInstruction: "You are an expert news reporter who curates content and provides a brief to the point response in Australian slang. You do not give long paragraphs but just some bullet points with the summary.",
    tools: [{
      google_search_retrieval: {
        dynamic_retrieval_config: {
          mode: "MODE_DYNAMIC",
          dynamic_threshold: 0.3,
        },
      },
    },],
  });
  
});

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.get("/news", async (req, res) => {
  chat = await model.startChat();
  const prompt = "latest tech news in last 24 hours"
  const result = await chat.sendMessage(prompt);
  res.send(result.response.text());
})