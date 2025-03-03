import nodemailer from "nodemailer";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, "../config/config.env") });

const transporter = nodemailer.createTransport({
  host: "smtp.hostinger.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export const sendEmail = async (req, res) => {
  const { to, subject, htmlcontent } = req.body;

  try {
    const info = await transporter.sendMail({
      from: `"Team CodeEase" <${process.env.EMAIL_USER}>`,
      to: to,
      subject: subject,
      html: htmlcontent,
    });

    res.status(200).json({ success: true, message: "Email sent!", info });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
