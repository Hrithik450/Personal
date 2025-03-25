import path from "path";
import { fileURLToPath } from "url";
import AdmZip from "adm-zip";
import fs from "fs";
import { collection, getDocs, query, where } from "firebase/firestore";
import db from "../database/firebase.js";
import { DateTime } from "luxon";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const usersCollRef = collection(db, "CodeEaseXUsers");
const TransactionRef = collection(db, "CodeEaseXSubscriptions");

function zipDirectory(sourceDir, outputZipPath) {
  const zip = new AdmZip();

  if (!fs.existsSync(sourceDir)) {
    console.log(`❌ Directory not found: ${sourceDir}`);
    return null;
  }

  zip.addLocalFolder(sourceDir);
  zip.writeZip(outputZipPath);

  return outputZipPath;
}

export const getZipFile = async (req, res, next) => {
  try {
    const { apiKey, project } = req.body;

    const q = query(usersCollRef, where("apiKey", "==", apiKey));
    const snapShot = await getDocs(q);

    if (snapShot.empty) {
      return res.status(400).json({
        success: false,
        message: "Invalid Api Key!!",
      });
    }

    const userData = snapShot.docs[0].data();

    const q1 = query(TransactionRef, where("userID", "==", userData.userID));
    const snapShot2 = await getDocs(q1);

    if (snapShot2.empty) {
      return res.status(400).json({
        success: false,
        message: "No subscription found!!",
      });
    }

    const subscriptionData = snapShot2.docs[0].data();

    const currentTime = DateTime.now().setZone("Asia/Kolkata").toMillis();
    if (
      subscriptionData.subscription.SubscriptionStatus === "inactive" ||
      subscriptionData.subscription.ValidTill < currentTime
    ) {
      return res.status(400).json({
        success: false,
        message: "Your subscription is expired!!",
      });
    }

    if (!project) {
      return res
        .status(400)
        .json({ error: "project directory is required in request body" });
    }

    const targetDir = path.resolve(
      __dirname,
      "../config/scripts",
      project,
      "bin"
    );

    const outputZipPath = path.resolve(
      __dirname,
      `../config/scripts/${project}`,
      "bin.zip"
    );

    const zipFile = zipDirectory(targetDir, outputZipPath);
    if (!zipFile) {
      return res.status(404).json({ error: "Bin directory not found" });
    }

    res.download(zipFile, "setup.zip", (err) => {
      if (err) {
        console.error("Error serving file:", err);
        res.status(500).send("Error downloading script");
      }
    });
  } catch (error) {
    console.error("Error processing request:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
