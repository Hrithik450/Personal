import { collection, setDoc, doc } from "firebase/firestore";
import db from "../database/firebase.js";
import { DateTime } from "luxon";
import { getLiveDate } from "../controllers/authController.js";

async function createSubscription(Subscription, customId) {
  const UsersCollectionRef = collection(db, "CodeEaseXSubscriptions");

  const docRef = doc(UsersCollectionRef, customId);

  await setDoc(docRef, Subscription);

  return customId;
}

export default createSubscription;
