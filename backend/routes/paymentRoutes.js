import express from "express";
import {
  capturePayment,
  checkPayment,
  checkTrial,
  createNewOrder,
  registerDevice,
} from "../controllers/paymentController.js";

const router = express.Router();

router.get("/check-payment", checkPayment);
router.post("/register", registerDevice);
router.post("/createOrder", createNewOrder);
router.post("/capturePayment", capturePayment);
router.post("/checkTrial", checkTrial);

export default router;
