import express from "express";
import { analyze } from "../controllers/errorController.js";

const router = express.Router();

router.post("/error", analyze);

export default router;
