import express from "express";
import { auth } from "../controllers/authController.js";

const router = express.Router();

router.get("/unknown", auth);

export default router;
