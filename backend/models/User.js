import { collection, addDoc, Timestamp } from "firebase/firestore";
import db from "../database/firebase.js";
import { DateTime } from "luxon";
import { getLiveDate } from "../controllers/authController.js";

async function createUser(userData) {
  const UsersCollectionRef = collection(db, "CodeEaseXUsers");

  const docRef = await addDoc(UsersCollectionRef, {
    userID: null,
    email: userData.email,
    password: userData.password,
    username: userData.username,
    lastLogin:
      userData.lastLogin || getLiveDate(DateTime.now().setZone("Asia/Kolkata")),
    resetPasswordToken: userData.resetPasswordToken || "",
    resetPasswordExpiresAt: userData.resetPasswordExpiresAt || null,
    createdAt: getLiveDate(DateTime.now().setZone("Asia/Kolkata")),
    updatedAt: getLiveDate(DateTime.now().setZone("Asia/Kolkata")),
  });

  return docRef.id;
}

export default createUser;
