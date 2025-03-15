import { doc, setDoc, getDoc, updateDoc, or } from "firebase/firestore";
import { fileURLToPath } from "url";
import db from "../config/db.js";
import { DateTime } from "luxon";
import Razorpay from "razorpay";
import crypto from "crypto";
import dotenv from "dotenv";
import axios from "axios";
import path from "path";
import ejs from "ejs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, "../config/config.env") });

const instance = new Razorpay({
  key_id: process.env.RAZORPAY_API_KEY,
  key_secret: process.env.RAZORPAY_API_SECRET,
});

function getLiveTime(inputDate) {
  return inputDate.toFormat("yyyy-MM-dd HH:mm:ss");
}

function getExpireTime(inputDate) {
  return inputDate.plus({ years: 1 }).toFormat("yyyy-MM-dd HH:mm:ss");
}

function generateLicense(uuid, NoOfTimesInstalled) {
  const hash = crypto
    .createHmac("sha256", process.env.SECRET + String(NoOfTimesInstalled))
    .update(uuid)
    .digest("hex")
    .slice(0, 8);

  return `${uuid}-${hash}`;
}

export const checkPayment = async (req, res) => {
  const uuid = req.headers["x-license-key"];
  const { packageName } = req.body;

  if (!uuid) {
    return res
      .status(400)
      .json({ success: false, message: "provide valid details" });
  }

  const docRef = doc(db, packageName, uuid);
  const existingDoc = await getDoc(docRef);

  if (!existingDoc.exists()) {
    return res
      .status(404)
      .json({ success: false, message: "Server error, retry again!" });
  }

  res.json({ credentials: existingDoc.data() });
};

export const registerDevice = async (req, res) => {
  try {
    const uuid = req.headers["x-license-key"];
    const { packageName } = req.body;

    if (!uuid || !packageName) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields: UUID or package name",
      });
    }

    const docRef = doc(db, packageName, uuid);
    const existingDoc = await getDoc(docRef);

    let NoOfTimesInstalled = 1;
    if (existingDoc.exists()) {
      NoOfTimesInstalled = existingDoc.data().NoOfTimesInstalled + 1;
    }

    const license = generateLicense(uuid, NoOfTimesInstalled);

    const data = {
      license: license,
      NoOfTimesInstalled: NoOfTimesInstalled,
      status: "pending",
      FeedbackStatus: "pending",
      freeTrial: existingDoc.exists() ? "inactive" : "active",
      createdAt: getLiveTime(DateTime.now().setZone("Asia/Kolkata")),
    };

    await setDoc(docRef, data, { merge: true });

    return res.status(200).json({
      success: true,
      freeTrial: data.freeTrial,
      license,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

export const createNewOrder = async (req, res, next) => {
  const { totalAmount } = req.body;

  try {
    if (!totalAmount || totalAmount < 100) {
      return res
        .status(400)
        .json({ success: false, message: "Amount Should be Min Rs. 100/-" });
    }

    const options = {
      amount: totalAmount * 100,
      currency: "INR",
    };

    const order = await instance.orders.create(options);

    return res.status(200).json({
      success: true,
      orderID: order.id,
      amount: order.amount,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Server error, try again later!" });
  }
};

export const capturePayment = async (req, res, next) => {
  const { formData, orderData, orderID, paymentID, uuid, packageName } =
    req.body;

  try {
    if (!orderID) {
      return res
        .status(500)
        .json({ success: false, message: "Server error, try again later!" });
    }

    const docRef = doc(db, packageName, uuid);
    const existingDoc = await getDoc(docRef);

    if (!existingDoc.exists()) {
      return res
        .status(404)
        .json({ success: false, message: "Payment failed, retry again!" });
    }

    const Payment = await instance.payments.fetch(paymentID);
    if (Payment.status !== "captured") {
      return res
        .status(400)
        .json({ success: false, message: "Payment Failed!" });
    }

    const paymentData = {
      ...orderData,
      ...formData,
      status: "active",
      paymentId: paymentID,
      payerId: Payment?.vpa,
      paidAt: getLiveTime(DateTime.now().setZone("Asia/Kolkata")),
      expiresAt: getExpireTime(DateTime.now().setZone("Asia/Kolkata")),
    };

    const existingData = existingDoc.data();
    await updateDoc(docRef, {
      ...existingData,
      ...paymentData,
    });

    const packageDetails = {
      orderNumber: orderID,
      customerName: formData.name,
      validTill: paymentData.expiresAt,
      paidAt: paymentData.paidAt,
      items: [
        {
          name: packageName,
          duration: "12 Months",
          price: `₹${orderData.totalAmount}`,
        },
      ],
    };

    const PACKAGE_URL = `https://github.com/Hrithik450/${packageName}`;
    const templatePath = path.resolve("views", "success.ejs");
    const htmlcontent = await ejs.renderFile(templatePath, {
      packageDetails,
      PACKAGE_URL,
    });

    res.status(200).json({
      success: true,
      message: "Payment successful!",
    });

    return await axios.post(process.env.EMAIL_API_URL, {
      email: formData.email,
      subject: `Payment successful! You've successfully purchased the ${packageName} package.`,
      message: htmlcontent,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Server error, try again later!" });
  }
};

export const checkTrial = async (req, res) => {
  const { uuid, packageName } = req.body;

  const docRef = doc(db, packageName, uuid);
  const snapShot = await getDoc(docRef);

  if (!snapShot.exists()) {
    return res.status(400).json({ success: false, message: "bad request" });
  }

  const licenseData = snapShot.data();

  if (licenseData.freeTrial === "active") {
    await updateDoc(docRef, {
      freeTrial: "inactive",
    });
  }

  return res.status(200).json({
    success: true,
  });
};

export const SendCode = async (req, res) => {
  const { uuid, email } = req.body;

  const docRef = doc(db, "mern-launcher", uuid);
  const snapShot = await getDoc(docRef);

  if (!snapShot.exists()) {
    return res
      .status(400)
      .json({ success: false, message: "Server error, try again!!" });
  }

  const verificationCode = Math.floor(100000 + Math.random() * 900000);

  await updateDoc(docRef, {
    verificationCode,
  });

  const templatePath = path.resolve("views", "verifyEmail.ejs");
  const htmlcontent = await ejs.renderFile(templatePath, {
    verificationToken: verificationCode,
  });

  await axios.post(process.env.EMAIL_API_URL, {
    email: email,
    subject: "Your verification code for codeEase",
    message: htmlcontent,
  });

  return res.status(200).json({
    success: true,
    message: "Verification code sent to your email!",
  });
};

export const verifyEmail = async (req, res) => {
  const { uuid, code } = req.body;

  const Code = Number(code);
  const docRef = doc(db, "mern-launcher", uuid);
  const snapShot = await getDoc(docRef);

  if (!snapShot.exists()) {
    return res
      .status(400)
      .json({ success: false, message: "Server error, try again!!" });
  }

  const verificationCode = snapShot.data().verificationCode;

  if (verificationCode !== Code) {
    return res
      .status(400)
      .json({ success: false, message: "Invalid verification code" });
  }

  await updateDoc(docRef, {
    verificationCode: null,
  });

  return res.status(200).json({
    success: true,
    message: "Email verified successfully!",
  });
};
