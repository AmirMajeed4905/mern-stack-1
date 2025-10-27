// server.js — production-ready Express server (ESM)
import dotenv from "dotenv";
dotenv.config();

import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import compression from "compression";
import helmet from "helmet";
import cors from "cors";
import morgan from "morgan";
import rateLimit from "express-rate-limit";
import mongoSanitize from "express-mongo-sanitize";
import xss from "xss-clean";
import hpp from "hpp";
import cookieParser from "cookie-parser";
import { expressStaticGzip } from "express-static-gzip";
import mongoose from "mongoose";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

/* ============================
   Basic runtime config
   ============================ */
const PORT = process.env.PORT || 5000;
const NODE_ENV = process.env.NODE_ENV || "development";
const MONGO_URI = process.env.MONGO_URI;

/* ============================
   Connect to MongoDB (optional)
   ============================ */
async function connectDB() {
  if (!MONGO_URI) return;
  try {
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("✅ MongoDB connected");
  } catch (err) {
    console.error("❌ MongoDB connection error:", err);
    process.exit(1);
  }
}
connectDB();

/* ============================
   Middlewares — security & performance
   ============================ */
// Logging (use morgan in dev, keep concise in prod)
if (NODE_ENV === "development") {
  app.use(morgan("dev"));
} else {
  app.use(morgan("combined")); // or use a file logger in prod
}

// Protect against some well-known vulnerabilities
app.use(helmet()); // sets many security headers

// CORS — adjust origin for production
const allowedOrigins = (process.env.CORS_ORIGINS || "").split(",").map(o => o.trim()).filter(Boolean);
app.use(
  cors({
    origin: allowedOrigins.length ? allowedOrigins : true,
    credentials: true,
  })
);

// Parse bodies/cookies
app.use(express.json({ limit: "10kb" })); // limit payloads
app.use(express.urlencoded({ extended: true, limit: "10kb" }));
app.use(cookieParser());

// Data sanitization against NoSQL injection
app.use(mongoSanitize());

// Data sanitization against XSS
app.use(xss());

// Prevent HTTP param pollution
app.use(hpp());

// Compression (gzip) — very important for serving JS/CSS
app.use(compression());

/* ============================
   Rate limiting
   ============================ */
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: process.env.RATE_LIMIT_MAX ? Number(process.env.RATE_LIMIT_MAX) : 100, // limit each IP
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: "Too many requests from this IP, please try again later." },
});
app.use("/api/", apiLimiter);

/* ============================
   API routes (example)
   ============================ */
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", env: NODE_ENV, time: new Date().toISOString() });
});

// TODO: mount your real API routes here
// app.use("/api/auth", authRoutes);
// app.use("/api/users", userRoutes);

/* ============================
   Serve static frontend (Vite build)
   - We expect frontend built into ../frontend/dist
   - Use expressStaticGzip to serve pre-compressed .br/.gz when available
   ============================ */
const clientDistPath = path.join(__dirname, "..", "frontend", "dist");

// Serve pre-compressed assets when present (you can pre-compress during build)
app.use(
  "/",
  expressStaticGzip(clientDistPath, {
    enableBrotli: true,
    orderPreference: ["br", "gz"],
    setHeaders: (res, _path) => {
      // aggressive caching for static assets
      res.setHeader("Cache-Control", "public, max-age=31536000, immutable");
    },
  })
);

// For client-side routing — return index.html for unknown routes
app.get("*", (req, res, next) => {
  const indexPath = path.join(clientDistPath, "index.html");
  res.sendFile(indexPath, (err) => {
    if (err) next(err);
  });
});

/* ============================
   Error handling middlewares
   ============================ */
app.use((req, _res, next) => {
  const err = new Error(`Not Found - ${req.originalUrl}`);
  err.status = 404;
  next(err);
});

app.use((err, req, res, _next) => {
  console.error(err.stack || err);
  const status = err.status || 500;
  res.status(status).json({
    message: err.message || "Internal Server Error",
    // in production avoid exposing stack traces
    ...(NODE_ENV === "development" ? { stack: err.stack } : {}),
  });
});

/* ============================
   Start server & graceful shutdown
   ============================ */
const server = app.listen(PORT, () => {
  console.log(`🚀 Server ready on port ${PORT} — env=${NODE_ENV}`);
});

// Graceful shutdown
function gracefulShutdown(signal) {
  console.log(`\n⚠️  Received ${signal}. Shutting down gracefully...`);
  server.close(async () => {
    // close DB connections
    try {
      await mongoose.connection.close(false);
      console.log("MongoDB connection closed.");
    } catch (e) {
      console.error("Error closing MongoDB connection:", e);
    }
    process.exit(0);
  });

  // force exit after timeout
  setTimeout(() => {
    console.error("Forcing shutdown.");
    process.exit(1);
  }, 30_000).unref();
}

process.on("SIGTERM", () => gracefulShutdown("SIGTERM"));
process.on("SIGINT", () => gracefulShutdown("SIGINT"));

process.on("unhandledRejection", (reason) => {
  console.error("Unhandled Rejection:", reason);
  // optionally shutdown or alert
});
process.on("uncaughtException", (err) => {
  console.error("Uncaught Exception:", err);
  process.exit(1); // let process manager restart the app
});
