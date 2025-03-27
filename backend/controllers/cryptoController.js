import crypto from "crypto";
import axios from "axios";
import path from "path";
import dotenv from "dotenv";
import { fileURLToPath } from "url";
import QRCode from "qrcode";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import db from "../database/firebase.js";
import { DateTime } from "luxon";
import createSubscription from "../models/Subscription.js";
import { getLiveDate } from "./authController.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, "../config/config.env") });

const BINANCE_SECRET_KEY = process.env.BINANCE_SECRET_KEY;
const BINANCE_API_KEY = process.env.BINANCE_API_KEY;

const TransactionRef = collection(db, "CodeEaseXSubscriptions");
const usersCollRef = collection(db, "CodeEaseXUsers");

const REQUIRED_CONFIRMATIONS = {
  TRX: 1,
  BCH: 2,
  XRP: 1,
  DOGE: 6,
  LTC: 3,
  XLM: 1,
  SOL: 1,
};

function generateAPIKey() {
  return crypto.randomBytes(32).toString("hex");
}

function SignReq(query_string) {
  return crypto
    .createHmac("sha256", BINANCE_SECRET_KEY)
    .update(query_string)
    .digest("hex");
}

function getValidTillMillis(months) {
  return DateTime.now()
    .setZone("Asia/Kolkata")
    .plus({ months: months })
    .toMillis();
}

function getValidTillDateString(months) {
  return DateTime.now()
    .setZone("Asia/Kolkata")
    .plus({ months: months })
    .toFormat("yyyy-MM-dd");
}

async function convertUSDTtoCrypto(
  totalPriceUSDT,
  cryptoSymbol,
  userID,
  planDuration
) {
  const userRef = doc(db, "CodeEaseXUsers", userID);
  const docSnap = await getDoc(userRef);
  const currentTime = DateTime.now().setZone("Asia/Kolkata").toMillis();

  if (docSnap.exists()) {
    const data = docSnap.data();

    if (
      data.depositInfo &&
      data.depositInfo[cryptoSymbol] &&
      data.depositInfo[cryptoSymbol].planDuration === planDuration
    ) {
      const timeDiff = currentTime - data.depositInfo[cryptoSymbol].timestamp;
      const timeDiffMinutes = timeDiff / (60 * 1000);

      if (timeDiffMinutes < 60) {
        return data.depositInfo[cryptoSymbol].cryptoAmount;
      }
    }
  }

  try {
    const response = await axios.get(
      `https://api.binance.com/api/v3/ticker/price?symbol=${cryptoSymbol}USDT`
    );
    const cryptoPrice = parseFloat(response.data.price);
    if (!cryptoPrice) throw new Error("Invalid price data received.");

    const cryptoAmount = (totalPriceUSDT / cryptoPrice).toFixed(6);

    const userRef = doc(db, "CodeEaseXUsers", userID);
    await setDoc(
      userRef,
      {
        depositInfo: {
          [cryptoSymbol]: {
            cryptoAmount,
            planDuration,
            timestamp: DateTime.now().setZone("Asia/Kolkata").toMillis(),
          },
        },
      },
      { merge: true }
    );

    return cryptoAmount;
  } catch (error) {
    console.error(`Error fetching ${cryptoSymbol} price:`, error.message);
    return null;
  }
}

async function generateQRCode(address) {
  try {
    const qrCodeData = await QRCode.toDataURL(address);
    return qrCodeData;
  } catch (error) {
    console.error("Error generating QR Code:", error);
  }
}

async function getBinanceTransaction(txId) {
  try {
    const serverTimeResponse = await axios.get(
      "https://api4.binance.com/api/v3/time"
    );
    const timestamp = serverTimeResponse.data.serverTime;
    const queryString = `timestamp=${timestamp}`;
    const signature = SignReq(queryString);

    const response = await axios.get(
      `https://api.binance.com/sapi/v1/capital/deposit/hisrec?${queryString}&signature=${signature}`,
      { headers: { "X-MBX-APIKEY": BINANCE_API_KEY } }
    );

    const transaction = response.data.find((tx) => tx.txId === txId);
    return transaction || null;
  } catch (error) {
    console.error("Error fetching Binance transaction:", error);
    return null;
  }
}

export async function expireSubscriptions() {
  try {
    const currentTimestamp = DateTime.now().setZone("Asia/Kolkata").toMillis();
    const subscriptionsRef = collection(db, "CodeEaseXSubscriptions");

    const q = query(
      subscriptionsRef,
      where("subscription.ValidTill", "<", currentTimestamp),
      where("subscription.SubscriptionStatus", "==", "active")
    );

    const snapshot = await getDocs(q);

    if (snapshot.empty) {
      console.log("No expired subscriptions found!");
      return;
    }

    const updatePromises = snapshot.docs.map(async (docSnap) => {
      const subsData = docSnap.data();
      const userID = subsData.userID;

      await updateDoc(docSnap.ref, {
        "subscription.SubscriptionStatus": "inactive",
      });

      if (subsData.subscription.Subscription === "Basic") {
        const userRef = doc(usersCollRef, userID);
        await updateDoc(userRef, { freeTrial: "Expired" });
      }
    });

    await Promise.all(updatePromises);
    console.log(`Updated ${snapshot.docs.length} subscriptions to inactive.`);
  } catch (error) {
    console.error("Error expiring subscriptions:", error);
  }
}

export const getDepositAddress = async (req, res, next) => {
  const { asset, network, totalUSDT, userID, planDuration } = req.query;

  if (!asset || !network || !userID || !planDuration) {
    return res.status(400).json({ error: "Missing required parameters" });
  }

  try {
    const serverTimeResponse = await axios.get(
      "https://api4.binance.com/api/v3/time"
    );
    const timestamp = serverTimeResponse.data.serverTime;

    const recvWindow = 5000;
    const queryString = `coin=${asset}&network=${network}&recvWindow=${recvWindow}&timestamp=${timestamp}`;
    const signature = SignReq(queryString);

    const response = await axios.get(
      `https://api.binance.com/sapi/v1/capital/deposit/address?${queryString}&signature=${signature}`,
      {
        headers: { "X-MBX-APIKEY": BINANCE_API_KEY },
      }
    );

    const depositAddress = response.data.address;
    const addressTag = response.data.tag || null;
    const qrCode = await generateQRCode(response.data.address);
    let memoQrCode;
    if (addressTag) memoQrCode = await generateQRCode(addressTag);
    const cryptoAmount = await convertUSDTtoCrypto(
      totalUSDT,
      asset,
      userID,
      planDuration
    );

    if (!cryptoAmount) {
      return res
        .status(500)
        .json({ error: "Failed to convert USDT to crypto" });
    }

    res.status(200).json({
      success: true,
      message: "Deposit address generated successfully",
      amount: cryptoAmount,
      memoTag: addressTag,
      memoQr: memoQrCode,
      depositAddress,
      qrCode,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const cryptoPay = async (req, res, next) => {
  const { txid, coin, userData, subscription } = req.body;

  if (!txid || !coin || !userData.userID)
    return res.status(400).json({ message: "Missing required fields" });

  try {
    const SubsRef = doc(TransactionRef, userData.userID);
    const SubSnap = await getDoc(SubsRef);

    const txRef = doc(collection(db, "CryptoTransactions"), txid);
    const txSnap = await getDoc(txRef);
    if (txSnap.exists()) {
      return res.status(400).json({ message: "Invalid TXID!" });
    }

    const txData = await getBinanceTransaction(txid);
    if (!txData) {
      return res
        .status(404)
        .json({ message: "Transaction not found on Binance." });
    }

    if (txData.amount !== subscription.expectedAmount) {
      return res
        .status(400)
        .json({ message: "Amount does not match the required deposit." });
    }

    if (txData.address !== subscription.expectedAddress) {
      return res.status(400).json({ message: "Invalid deposit address." });
    }

    const userDataExists = SubSnap.exists();
    const requiredConfirmations = REQUIRED_CONFIRMATIONS[coin.toUpperCase()];
    const confirmTimes = parseInt(txData.confirmTimes.split("/")[0]);

    const newTransaction = {
      txid,
      Coin: txData.coin,
      Network: txData.network,
      AmountInUsdt: subscription.usdtAmount,
      AmountInCrypto: txData.amount,
      ValidTill: getValidTillMillis(subscription.PlanDuration),
      ValidTillDate: getValidTillDateString(subscription.PlanDuration),
      PaymentStatus:
        confirmTimes >= requiredConfirmations ? "confirmed" : "pending",
      Subscription: subscription.Subscription,
      PlanDuration: subscription.PlanDuration,
      PaymentMode: subscription.PaymentMode,
      PlanRate: subscription.PlanRate,
      AmountPaidByUser: txData.amount,
      PaidAddress: txData.address,
      confirmations: `${confirmTimes}/${requiredConfirmations}`,
      SubscriptionStatus:
        confirmTimes >= requiredConfirmations ? "active" : "pending",
    };

    const apiKey =
      confirmTimes >= requiredConfirmations ? generateAPIKey() : "pending";

    const userRef = doc(usersCollRef, userData.userID);
    await updateDoc(userRef, { apiKey, freeTrial: "Expired" });

    if (userDataExists) {
      await updateDoc(SubsRef, {
        lastPurchased: getLiveDate(DateTime.now().setZone("Asia/Kolkata")),
        subscription: newTransaction,
      });
    } else {
      await createSubscription(
        {
          userID: userData.userID,
          email: userData.email,
          username: userData.username,
          lastPurchased: getLiveDate(DateTime.now().setZone("Asia/Kolkata")),
          subscription: newTransaction,
        },
        userData.userID
      );
    }

    await setDoc(txRef, {
      txid,
      userID: userData.userID,
      username: userData.username,
      userEmail: userData.email,
    });

    res.status(200).json({
      success: true,
      message:
        confirmTimes >= requiredConfirmations
          ? "Payment Successfull!"
          : "Payment pending...",
      transaction: newTransaction,
    });
  } catch (error) {
    console.log(error);
  }
};

export const freePack = async (req, res, next) => {
  try {
    const { userData, subscription } = req.body;

    const SubsRef = doc(TransactionRef, userData.userID);
    const SubSnap = await getDoc(SubsRef);

    const userDataExists = SubSnap.exists();

    const newTransaction = {
      AmountInUsdt: subscription.usdtAmount,
      ValidTill: DateTime.now()
        .setZone("Asia/Kolkata")
        .plus({ hours: 24 })
        .toMillis(),
      ValidTillDate: DateTime.now()
        .setZone("Asia/Kolkata")
        .plus({ hours: 24 })
        .toFormat("yyyy-MM-dd"),
      PaymentStatus: "confirmed",
      Subscription: subscription.Subscription,
      AmountPaidByUser: subscription.usdtAmount,
      PlanRate: subscription.PlanRate,
      SubscriptionStatus: "active",
    };

    if (userDataExists) {
      await updateDoc(SubsRef, {
        lastPurchased: getLiveDate(DateTime.now().setZone("Asia/Kolkata")),
        subscription: newTransaction,
      });
    } else {
      await createSubscription(
        {
          userID: userData.userID,
          email: userData.email,
          username: userData.username,
          lastPurchased: getLiveDate(DateTime.now().setZone("Asia/Kolkata")),
          subscription: newTransaction,
        },
        userData.userID
      );
    }

    const apiKey = generateAPIKey();

    const userRef = doc(usersCollRef, userData.userID);
    await updateDoc(userRef, { apiKey, freeTrial: "Active" });

    res.status(200).json({
      success: true,
      message: "Purchase Successful!",
      transaction: newTransaction,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
