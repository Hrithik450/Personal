import { fileURLToPath } from "url";
import express from "express";
import passport from "passport";
import dotenv from "dotenv";
import path from "path";
import {
  forgetPassword,
  login,
  logout,
  Profile,
  resetPassword,
  setCookie,
  signup,
} from "../controllers/authController.js";
import { isAuthenticated } from "../middlewares/authMiddleware.js";

const router = express.Router();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, "../.env") });

router.post("/signup", signup);
router.post("/login", login);
router.post("/forget-password", forgetPassword);
router.post("/reset-password/:resetToken", resetPassword);
router.get("/profile", isAuthenticated, Profile);
router.post("/set-cookie", setCookie);
router.get("/logout", logout);

router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: `${process.env.FRONTEND_URL}/?authpage=open&auth=login`,
    session: false,
  }),
  (req, res) => {
    const user = req.user;
    const url = `${process.env.FRONTEND_URL}/?authpage=open&auth=login&tempToken=${user.userID}`;
    res.redirect(url);
  }
);

router.get(
  "/facebook",
  passport.authenticate("facebook", { scope: ["email"] })
);

router.get(
  "/facebook/callback",
  passport.authenticate("facebook", {
    failureRedirect: `${process.env.FRONTEND_URL}/?authpage=open&auth=login`,
    session: false,
  }),
  (req, res) => {
    const user = req.user;
    const url = `${process.env.FRONTEND_URL}/?authpage=open&auth=login&tempToken=${user.userID}`;
    res.redirect(url);
  }
);

export default router;
