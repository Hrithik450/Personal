import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD1Er-DVOu-4kyDDdu3tCP6aGzfFVFEYAk",
  authDomain: "npm-packages-7a3fd.firebaseapp.com",
  projectId: "npm-packages-7a3fd",
  storageBucket: "npm-packages-7a3fd.firebasestorage.app",
  messagingSenderId: "887444771068",
  appId: "1:887444771068:web:e5eba3a399edfe6fb30779",
  measurementId: "G-FEMJRGZZN7",
};

const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);

export default db;
