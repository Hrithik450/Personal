import { createRequire } from "module";
import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";
import { fileURLToPath } from "url";
import path from "path";

const require = createRequire(import.meta.url);
const faqsdata = require("../data/faqs.json");

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, "../config/config.env") });

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const embeddingModel = genAI.getGenerativeModel({
  model: "gemini-embedding-exp-03-07",
});

export const Getfaqsdata = async (req, res) => {
  return res.status(200).json(faqsdata);
};

export const getEmbeddings = async (req, res) => {
  const { text } = req.body;

  try {
    const result = await embeddingModel.embedContent(text);
    const embedding = result?.embedding?.values;
    return embedding || null;
  } catch (error) {
    console.error("Error generating embeddings:", error);
    return null;
  }
};
