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
import {
  cryptoPay,
  freePack,
  getDepositAddress,
} from "../controllers/cryptoController.js";

const router = express.Router();

router.post("/check-payment", checkPayment);
router.post("/register", registerDevice);
router.post("/createOrder", createNewOrder);
router.post("/capturePayment", capturePayment);
router.post("/checkTrial", checkTrial);
router.post("/sendCode", SendCode);
router.post("/verifyCode", verifyEmail);
router.post("/sendMail", sendEmail);
router.post("/crypto/verify", cryptoPay);
router.post("/crypto/verify/freePack", freePack);
router.get("/crypto/getAddress", getDepositAddress);

export default router;
