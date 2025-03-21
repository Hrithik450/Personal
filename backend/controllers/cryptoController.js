import crypto from "crypto";
import axios from "axios";
import path from "path";
import dotenv from "dotenv";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, "../config/config.env") });

const BINANCE_SECRET_KEY = process.env.BINANCE_SECRET_KEY;
const BINANCE_API_KEY = process.env.BINANCE_API_KEY;

function signRequest(queryString, secretKey) {
  return crypto
    .createHmac("sha256", secretKey)
    .update(queryString)
    .digest("hex");
}

export const getDepositAddress = async (req, res, next) => {
  const { asset, network } = req.query;

  if (!asset || !network) {
    return res.status(400).json({ error: "Missing asset or network" });
  }

  try {
    const serverTimeResponse = await axios.get(
      "https://api.binance.com/api/v3/time"
    );
    const timestamp = serverTimeResponse.data.serverTime;
    const queryString = `coin=${asset}&network=${network}&timestamp=${timestamp}`;
    const signature = signRequest(queryString, BINANCE_SECRET_KEY);
    const response = await axios.get(
      `https://api.binance.com/sapi/v1/capital/deposit/address?${queryString}&signature=${signature}`,
      {
        headers: { "X-MBX-APIKEY": BINANCE_API_KEY },
      }
    );
    res.status(200).json({
      success: true,
      data: response.data,
    });
  } catch (error) {
    console.error(
      "Error fetching deposit address:",
      error.response?.data || error.message
    );
    res.status(500).json({ error: "Internal server error" });
  }
};

export const cryptoPay = async (req, res, next) => {
  const { txid } = req.body;

  //   if (!txid) {
  //     return res.status(400).json({ error: "Missing txid or amount" });
  //   }

  try {
    const serverTimeResponse = await axios.get(
      "https://api.binance.com/api/v3/time"
    );
    const serverTime = serverTimeResponse.data.serverTime;

    const queryString = `timestamp=${serverTime}`;
    const signature = signRequest(queryString, BINANCE_SECRET_KEY);

    const response = await axios({
      method: "GET",
      url: `https://api.binance.com/sapi/v1/capital/deposit/hisrec?timestamp=${serverTime}&signature=${signature}`,
      headers: {
        "X-MBX-APIKEY": BINANCE_API_KEY,
      },
    });

    const transactions = response.data;
    console.log(transactions);
  } catch (error) {
    console.log(error);
  }
};

export const getAddresses = async (req, res, next) => {
  getDepositAddress("USDT", "BEP20").then((address) => {
    console.log("Generated Address:", address);
  });

  return res.status(200).json({
    success: true,
  });
};
