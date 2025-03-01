import express from "express";
import {
  doc,
  setDoc,
  getDoc,
  updateDoc,
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import AdmZip from "adm-zip";
import fs from "fs";
import { fileURLToPath } from "url";
import path from "path";
import crypto from "crypto";
import { DateTime } from "luxon";
import Razorpay from "razorpay";
import db from "../config/db.js";
import dotenv from "dotenv";

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

function generateLicense(uuid, NoOfTimesRegistered) {
  const hash = crypto
    .createHmac("sha256", process.env.SECRET + NoOfTimesRegistered)
    .update(uuid)
    .digest("hex")
    .slice(0, 8);

  return `${uuid}-${hash}`;
}

export const checkPayment = async (req, res) => {
  const uuid = req.headers["x-license-key"];
  if (!uuid) {
    return res
      .status(400)
      .json({ success: false, message: "provide valid details" });
  }

  const docRef = doc(db, "mern-launcher", uuid);
  const existingDoc = await getDoc(docRef);

  if (!existingDoc.exists()) {
    return res
      .status(404)
      .json({ success: false, message: "Payment failed, retry again!" });
  }

  res.json({ credentials: existingDoc.data() });
};

export const registerDevice = async (req, res) => {
  try {
    const uuid = req.headers["x-license-key"];
    if (!uuid) {
      return res.status(400).json({ success: false, message: "Missing UUID" });
    }

    const docRef = doc(db, "mern-launcher", uuid);
    const existingDoc = await getDoc(docRef);

    let NoOfTimesRegistered = 1;
    if (existingDoc.exists()) {
      NoOfTimesRegistered = existingDoc.data().NoOfTimesRegistered + 1;
    }

    const license = generateLicense(uuid, NoOfTimesRegistered);

    const data = {
      license: license,
      NoOfTimesRegistered: NoOfTimesRegistered,
      status: "pending",
      createdAt: getLiveTime(DateTime.now().setZone("Asia/Kolkata")),
    };

    await setDoc(docRef, data, { merge: true });

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error("Error registering device:", error);
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
  const { formData, orderData, orderID, paymentID, uuid } = req.body;
  try {
    if (!orderID) {
      return res
        .status(500)
        .json({ success: false, message: "Server error, try again later!" });
    }

    const docRef = doc(db, "mern-launcher", uuid);
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

    const orderDetails = {
      orderNumber: orderID,
      customerName: formData.name,
      AmountPaid: `₹${orderData.totalAmount}`,
      validTill: paymentData.expiresAt,
      paidAt: paymentData.paidAt,
    };

    // const CLIENT_URL = process.env.FRONTEND_URL;
    // const templatePath = path.resolve("views", "success.ejs");
    // const htmlcontent = await ejs.renderFile(templatePath, {
    //   orderDetails,
    //   CLIENT_URL,
    // });

    res.status(200).json({
      success: true,
      message: "Payment successful!",
    });

    // return await axios.post(process.env.EMAIL_API_URL, {
    //   email: formData.email,
    //   subject: `Payment successful! You've successfully purchased the MERN Launcher package.`,
    //   message: htmlcontent,
    // });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "Server error, try again later!" });
  }
};

// function zipFiles(outputZipPath, files) {
//   const zip = new AdmZip();

//   files.forEach((file) => {
//     const filePath = path.resolve(__dirname, "..", "config", file);

//     if (fs.existsSync(filePath)) {
//       zip.addLocalFile(filePath);
//     } else {
//       console.log(`❌ File not found: ${file}`);
//     }
//   });

//   zip.writeZip(outputZipPath);
// }

// const packageDir = path.resolve(__dirname, "..", "config");
// const outputZipPath = path.join(packageDir, "credentials.zip");
// const filesToZip = ["db.js", "credentials.js"];

// zipFiles(outputZipPath, filesToZip);
