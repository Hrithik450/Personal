import express from "express";
import {
  capturePayment,
  checkPayment,
  checkTrial,
  createNewOrder,
  registerDevice,
  SendCode,
  verifyEmail,
} from "../controllers/paymentController.js";
import { sendEmail } from "../utils/sendMail.js";

const router = express.Router();

router.get("/check-payment", checkPayment);
router.post("/register", registerDevice);
router.post("/createOrder", createNewOrder);
router.post("/capturePayment", capturePayment);
router.post("/checkTrial", checkTrial);
router.post("/sendCode", SendCode);
router.post("/verifyCode", verifyEmail);
router.post("/sendMail", sendEmail);

export default router;
