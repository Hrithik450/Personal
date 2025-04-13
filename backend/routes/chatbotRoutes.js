import express from "express";
import { Getfaqsdata } from "../controllers/chatbotController.js";

const router = express.Router();

router.get("/faqs", Getfaqsdata);

export default router;
