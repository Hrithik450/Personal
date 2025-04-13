import express from "express";
import {
  getEmbeddings,
  Getfaqsdata,
} from "../controllers/chatbotController.js";

const router = express.Router();

router.get("/faqs", Getfaqsdata);
router.post("/getEmbeddings", getEmbeddings);

export default router;
