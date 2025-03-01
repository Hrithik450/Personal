import { getZipFile } from "../controllers/scriptController.js";
import express from "express";

const router = express.Router();

router.post("/download-zip", getZipFile);

export default router;
