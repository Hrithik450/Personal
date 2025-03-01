import express from "express";
import { callWebhook } from "../controllers/webhookController.js";

const router = express.Router();

router.get("/", callWebhook);

export default router;
