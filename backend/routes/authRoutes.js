import { fileURLToPath } from "url";
import express from "express";
import passport from "passport";
import dotenv from "dotenv";
import path from "path";
import CryptoJS from "crypto-js";

const router = express.Router();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, "config/config.env") });

const encryptEmail = (email) => {
  const encrypted = CryptoJS.AES.encrypt(
    email,
    process.env.MAIL_SECRET
  ).toString();
  return encrypted;
};

router.get(
  "/google",
  (req, res, next) => {
    const redirectUrl = req.query.redirectUrl || process.env.FRONTEND_URL;
    req.session.redirectUrl = redirectUrl;
    next();
  },
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get("/google/callback", (req, res, next) => {
  passport.authenticate("google", { session: false }, (err, user, info) => {
    const redirectUrl = req.session?.redirectUrl || process.env.FRONTEND_URL;

    if (err || !user) {
      return res.redirect(`${redirectUrl}`);
    }

    const userEmail = user.email;
    const encryptedEmail = encryptEmail(userEmail);

    const url = new URL(decodeURIComponent(redirectUrl));
    url.searchParams.set("data", encodeURIComponent(encryptedEmail));

    res.redirect(url.toString());
  })(req, res, next);
});

export default router;
