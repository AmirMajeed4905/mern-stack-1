// server.js
const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const mongoSanitize = require("express-mongo-sanitize");

// =======================
// 🔹 CONFIG
// =======================
dotenv.config();
const app = express();

// =======================
// 🔹 MIDDLEWARE
// =======================
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CORS – adjust origin for your frontend URL
app.use(cors({
  origin: "*", // Change this to your frontend domain in production
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
}));

// Helmet for securing HTTP headers
app.use(helmet());

// Rate limiter – blocks abuse & brute force attacks
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 mins
  limit: 100, // max requests per IP
  message: "Too many requests from this IP, try again later."
});
app.use(limiter);

// Fix express-mongo-sanitize issue for Express 5
app.use((req, res, next) => {
  if (req.body) mongoSanitize.sanitize(req.body);
  if (req.params) mongoSanitize.sanitize(req.params);
  next();
});

// =======================
// 🔹 TEST ROUTE
// =======================
app.get("/api/health", (req, res) => {
  res.status(200).json({ success: true, message: "Server is running fine 🚀" });
});

// =======================
// 🔹 DATABASE CONNECTION
// =======================
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`✅ MongoDB connected: ${conn.connection.host}`);
  } catch (err) {
    console.error("❌ MongoDB connection failed:", err.message);
    process.exit(1);
  }
};

// =======================
// 🔹 START SERVER
// =======================
const PORT = process.env.PORT || 5000;

app.listen(PORT, async () => {
  await connectDB();
  console.log(`🔥 Server running on port ${PORT}`);
});
