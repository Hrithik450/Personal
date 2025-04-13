import { createRequire } from "module";
import OpenAI from "openai";
import dotenv from "dotenv";
import { fileURLToPath } from "url";
import path from "path";

const require = createRequire(import.meta.url);
const faqsdata = require("../data/faqs.json");

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, "../config/config.env") });

const openai = new OpenAI({
  apiKey: process.env.GPT_API_KEY,
});

export const Getfaqsdata = async (req, res) => {
  return res.status(200).json(faqsdata);
};

export const getEmbeddings = async (req, res) => {
  const { text } = req.body;

  try {
    const embedding = await openai.embeddings.create({
      model: "text-embedding-3-small",
      input: text,
      encoding_format: "float",
    });

    return embedding || null;
  } catch (error) {
    console.error("Error generating embeddings:", error);
    return null;
  }
};
