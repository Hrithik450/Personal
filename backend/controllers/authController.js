import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { Strategy as FacebookStrategy } from "passport-facebook";
import { generateTokenandSetcookie } from "../utils/generateToken.js";
import bcryptjs from "bcryptjs";
import crypto from "crypto";
import axios from "axios";
import path from "path";
import ejs from "ejs";
import db from "../database/firebase.js";
import createUser from "../models/User.js";
import { DateTime } from "luxon";
import {
  collection,
  query,
  where,
  getDocs,
  doc,
  updateDoc,
  getDoc,
  setDoc,
  Timestamp,
} from "firebase/firestore";

const usersRef = collection(db, "CodeEaseXUsers");

export function getLiveDate(inputDate) {
  return inputDate.toFormat("yyyy-MM-dd HH:mm:ss");
}

export const signup = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    if (!email || !username || !password)
      return res
        .status(400)
        .json({ success: false, message: "All fields are required." });

    const userSnapshot = await getDocs(
      query(usersRef, where("email", "==", email))
    );

    if (!userSnapshot.empty)
      return res.status(400).json({
        success: false,
        message: "User already exists. Try logging in.",
      });

    const hashedPassword = await bcryptjs.hash(password, 10);

    const user = {
      username: username,
      email: email,
      password: hashedPassword,
    };

    const userID = await createUser(user);
    const userDocRef = doc(usersRef, userID);
    await updateDoc(userDocRef, {
      userID: userID,
    });

    const token = generateTokenandSetcookie(res, userID, username);

    res.status(201).json({
      success: true,
      message: "Successfully Registered!",
      user: { ...user, password: null, token },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error. Please try again later.",
    });
  }
};

export const login = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    if (!email || !password)
      return res
        .status(400)
        .json({ success: false, message: "Email and password are required." });

    const userQuery = query(usersRef, where("email", "==", email));
    const userSnapshot = await getDocs(userQuery);

    if (userSnapshot.empty)
      return res.status(401).json({
        success: false,
        message: "Invalid credentials. Please try again.",
      });

    const user = userSnapshot.docs[0].data();

    if (!user.password) {
      return res.status(400).json({
        success: false,
        message:
          "Password not found. This account may be linked to Google or Facebook.",
      });
    }

    const isPasswordMatch = await bcryptjs.compare(password, user.password);
    if (!isPasswordMatch)
      return res.status(401).json({
        success: false,
        message: "Invalid credentials. Please try again.",
      });

    const token = generateTokenandSetcookie(res, user.userID, user.username);
    const UserDocRef = doc(usersRef, user.userID);
    await updateDoc(UserDocRef, {
      lastLogin: getLiveDate(DateTime.now().setZone("Asia/Kolkata")),
    });

    res.status(200).json({
      success: true,
      message: "Login successful!",
      user: {
        userID: user.userID,
        email: user.email,
        username: user.username,
        token,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error. Please try again later.",
    });
  }
};

export const logout = async (req, res, next) => {
  res.clearCookie("CODEEASEX", {
    httpOnly: true,
    secure: true,
    sameSite: "None",
    path: "/",
  });
  res.status(200).json({
    success: true,
    message: "Successfully logged out!",
    user: null,
  });
};

export const forgetPassword = async (req, res, next) => {
  const { email } = req.body;

  try {
    if (!email) {
      return res
        .status(400)
        .json({ success: false, message: "Please enter your email." });
    }

    const Userquery = query(usersRef, where("email", "==", email));
    const UserSnapShot = await getDocs(Userquery);

    if (UserSnapShot.empty) {
      return res.status(404).json({
        success: false,
        message: "User not found! Please check your email and try again.",
      });
    }

    const user = UserSnapShot.docs[0].data();
    const userId = user.userID;

    const resetToken = crypto.randomBytes(32).toString("hex");
    const resetTokenhash = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");
    const resetTokenExpiresAt = Date.now() + 15 * 60 * 1000;

    const UserDocRef = doc(usersRef, userId);
    await updateDoc(UserDocRef, {
      resetPasswordToken: resetTokenhash,
      resetPasswordExpiresAt: resetTokenExpiresAt,
    });

    const resetlink = `${process.env.FRONTEND_URL}/?authpage=open&auth=login&resetPassword=open&resetToken=${resetToken}`;

    const CLIENT_URL = process.env.FRONTEND_URL;
    const templatePath = path.resolve("views", "PassresetEmail.ejs");
    const htmlcontent = await ejs.renderFile(templatePath, {
      resetlink,
      CLIENT_URL,
    });

    await axios.post(process.env.EMAIL_API_URL, {
      email: email,
      subject: "Security Alert",
      message: htmlcontent,
    });

    res.status(200).json({
      success: true,
      message: "Password reset link has been sent to your email successfully!",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error. Please try again later.",
    });
  }
};

export const resetPassword = async (req, res, next) => {
  const { resetToken } = req.params;
  const { password, confirmPassword } = req.body;

  try {
    if (!resetToken) {
      return res
        .status(400)
        .json({ success: false, message: "Reset link is invalid or expired." });
    }

    if (password !== confirmPassword) {
      return res
        .status(401)
        .json({ success: false, message: "Passwords do not match." });
    }

    const resetTokenhash = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");

    const Query = query(
      usersRef,
      where("resetPasswordToken", "==", resetTokenhash),
      where("resetPasswordExpiresAt", ">", Date.now())
    );

    const userSnapshot = await getDocs(Query);

    if (userSnapshot.empty) {
      return res
        .status(404)
        .json({ success: false, message: "Reset link expired. Try again." });
    }

    const user = userSnapshot.docs[0].data();
    const userId = user.userID;

    const hashedPassword = await bcryptjs.hash(password, 10);

    const userDocRef = doc(usersRef, userId);
    await updateDoc(userDocRef, {
      password: hashedPassword,
      resetPasswordToken: null,
      resetPasswordExpiresAt: null,
      updatedAt: getLiveDate(DateTime.now().setZone("Asia/Kolkata")),
    });

    const resetlink = `${process.env.FRONTEND_URL}/forget-password`;

    const CLIENT_URL = process.env.FRONTEND_URL;
    const templatePath = path.resolve("views", "PassSuccessfull.ejs");
    const htmlcontent = await ejs.renderFile(templatePath, {
      resetlink,
      CLIENT_URL,
    });

    await axios.post(process.env.EMAIL_API_URL, {
      email: user.email,
      subject: "Security Alert",
      message: htmlcontent,
    });

    res.status(200).json({
      success: true,
      message: "password reset successful, you can now login with new password",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Server error. Please try again later.",
    });
  }
};

export const checkUserByEmail = async (email) => {
  try {
    const q = query(usersRef, where("email", "==", email));
    const emailSnapshot = await getDocs(q);

    if (!emailSnapshot.empty) {
      return emailSnapshot.docs[0].data();
    }
    return null;
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error. Please try again later.",
    });
  }
};

export const googleAuth = (req, res, next) => {
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: `${process.env.BACKEND_URL}/api/v1/auth/google/callback`,
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          const GoogleID = profile.id;

          const userDocRef = doc(usersRef, GoogleID);
          const userDoc = await getDoc(userDocRef);

          if (!userDoc.exists()) {
            const newUser = {
              userID: GoogleID,
              username: profile.displayName,
              email: profile.emails[0].value,
              image: profile.photos[0].value,
              createdAt: getLiveDate(DateTime.now().setZone("Asia/Kolkata")),
              lastLogin: getLiveDate(DateTime.now().setZone("Asia/Kolkata")),
              isVerified: true,
              isAdmin: false,
            };

            const userExists = await checkUserByEmail(newUser.email);
            if (userExists) {
              const existingUserDocRef = doc(usersRef, userExists.userID);
              await updateDoc(existingUserDocRef, {
                lastLogin: getLiveDate(DateTime.now().setZone("Asia/Kolkata")),
              });

              return done(null, { userID: userExists.userID });
            }

            await setDoc(userDocRef, newUser);

            const CLIENT_URL = process.env.FRONTEND_URL;
            const templatePath = path.resolve("views", "welcome.ejs");
            const htmlcontent = await ejs.renderFile(templatePath, {
              CLIENT_URL,
            });

            await axios.post(process.env.EMAIL_API_URL, {
              email: newUser.email,
              subject: "WELCOME TO CodeEaseX!",
              message: htmlcontent,
            });

            return done(null, { userID: newUser.userID });
          } else {
            await updateDoc(userDocRef, {
              lastLogin: getLiveDate(DateTime.now().setZone("Asia/Kolkata")),
            });
            return done(null, { userID: GoogleID });
          }
        } catch (error) {
          done(error, null);
        }
      }
    )
  );
};

export const facebookAuth = (req, res, next) => {
  passport.use(
    new FacebookStrategy(
      {
        clientID: process.env.FACEBOOK_CLIENT_ID,
        clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
        callbackURL: `${process.env.BACKEND_URL}/api/v1/auth/facebook/callback`,
        profileFields: ["id", "emails", "name", "picture.type(large)"],
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          const FacebookID = profile.id;

          const userDocRef = doc(usersRef, FacebookID);
          const UserDoc = await getDoc(userDocRef);

          if (!UserDoc.exists()) {
            const newUser = {
              userID: FacebookID,
              username: `${profile.name.givenName} ${profile.name.familyName}`,
              email: profile.emails ? profile.emails[0].value : null,
              image: profile.photos ? profile.photos[0].value : null,
              createdAt: getLiveDate(DateTime.now().setZone("Asia/Kolkata")),
              lastLogin: getLiveDate(DateTime.now().setZone("Asia/Kolkata")),
              isVerified: profile.emails ? true : false,
              isAdmin: false,
            };

            if (!newUser.email) {
              return done(
                new Error("Your Facebook account does not provide an email"),
                null
              );
            }

            const userExists = await checkUserByEmail(newUser.email);

            if (userExists) {
              const existingUserDocRef = doc(usersRef, userExists.userID);
              await updateDoc(existingUserDocRef, {
                lastLogin: getLiveDate(DateTime.now().setZone("Asia/Kolkata")),
              });

              return done(null, { userID: userExists.userID });
            }

            await setDoc(userDocRef, newUser);

            const CLIENT_URL = process.env.FRONTEND_URL;
            const templatePath = path.resolve("views", "welcome.ejs");
            const htmlcontent = await ejs.renderFile(templatePath, {
              CLIENT_URL,
            });

            await axios.post(process.env.EMAIL_API_URL, {
              email: newUser.email,
              subject: "WELCOME TO CodeEaseX!",
              message: htmlcontent,
            });

            return done(null, { userID: newUser.userID });
          } else {
            await updateDoc(userDocRef, {
              lastLogin: getLiveDate(DateTime.now().setZone("Asia/Kolkata")),
            });

            return done(null, { userID: FacebookID });
          }
        } catch (error) {
          console.log(error);
          return done(error, null);
        }
      }
    )
  );
};

export const setCookie = async (req, res, next) => {
  try {
    const { userID } = req.body;

    if (!userID) {
      return res
        .status(400)
        .json({ success: false, message: "User ID is required." });
    }

    const UserDocRef = doc(usersRef, userID);
    const userDoc = await getDoc(UserDocRef);

    if (!userDoc.exists()) {
      return res
        .status(404)
        .json({ success: false, message: "Invalid User ID." });
    }
    const userData = userDoc.data();
    const token = generateTokenandSetcookie(res, userID, userData.username);

    return res.status(200).json({
      success: true,
      user: { ...userDoc.data(), token },
      message: "Login successful!",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error. Please try again later.",
    });
  }
};

export const Profile = async (req, res, next) => {
  try {
    const UserId = req.user.userID;

    if (!UserId) {
      return res
        .status(400)
        .json({ success: false, message: "User ID is required." });
    }

    const UserDocRef = doc(usersRef, UserId);
    const UserSnapShot = await getDoc(UserDocRef);

    if (!UserSnapShot.exists()) {
      return res
        .status(404)
        .json({ success: false, message: "User not found." });
    }

    const user = UserSnapShot.data();
    return res.status(200).json({
      success: true,
      user: {
        ...user,
        password: null,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error. Please try again later.",
    });
  }
};
