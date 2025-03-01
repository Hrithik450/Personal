import express from "express";
import {
  capturePayment,
  checkPayment,
  createNewOrder,
  registerDevice,
} from "../controllers/paymentController.js";

const router = express.Router();

router.get("/check-payment", checkPayment);
router.post("/register", registerDevice);
router.post("/createOrder", createNewOrder);
router.post("/capturePayment", capturePayment);

export default router;
