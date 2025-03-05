import { doc, getDoc, updateDoc } from "firebase/firestore";
import { fileURLToPath } from "url";
import db from "../config/db.js";
import dotenv from "dotenv";
import path from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, "../config/config.env") });

export const createFeedback = async (req, res) => {
  try {
    const { feedback, packageName, uuid } = req.body;

    if (!uuid || !packageName) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields: UUID or package name.",
      });
    }

    const docRef = doc(db, packageName, uuid);
    const existingDoc = await getDoc(docRef);

    if (!existingDoc.exists()) {
      return res.status(404).json({
        success: false,
        message: "Invalid UUID or package not found. Please retry!",
      });
    }

    await updateDoc(docRef, {
      ...existingDoc.data(),
      ...feedback,
      FeedbackStatus: "completed",
    });

    return res.status(200).json({
      success: true,
      message: "Thank you for providing your valuable feedback!!",
    });
  } catch (error) {
    console.error("Error creating feedback:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error. Please try again later.",
    });
  }
};
