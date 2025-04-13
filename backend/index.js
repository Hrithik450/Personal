import path from "path";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { fileURLToPath } from "url";
import passport from "passport";
import cookieParser from "cookie-parser";
import session from "express-session";
import paymentRoutes from "./routes/paymentRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import scriptRoutes from "./routes/scriptRoutes.js";
import webhookRoutes from "./routes/webhookRoutes.js";
import feedbackRoutes from "./routes/feedbackRoutes.js";
import errorRoutes from "./routes/errorRoutes.js";
import { googleAuth } from "./controllers/authController.js";
import { errorHandler } from "./middlewares/errorHandler.js";
import { monitor } from "./monitor.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, "config/config.env") });

const app = express();
const FRONTEND_URL = process.env.FRONTEND_URL;

app.use(
  cors({
    origin: FRONTEND_URL,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
  })
);

monitor();
googleAuth();
app.use(passport.initialize());
app.use(passport.session());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/v1/payment", paymentRoutes);
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/scripts", scriptRoutes);
app.use("/api/v1/feedback", feedbackRoutes);
app.use("/api/v1/analyze", errorRoutes);
app.use("/webhook", webhookRoutes);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log("Server running on port:", PORT));
