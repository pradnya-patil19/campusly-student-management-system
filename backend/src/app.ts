
import express from "express";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";

import { env } from "./config/env";
import studentRoutes from "./routes/student.routes";
import { errorHandler } from "./middleware/errorHandler";

export const app = express();

app.use(helmet());

app.use(
  cors({
    origin: [
      "http://localhost:4200",
      "http://127.0.0.1:4200",
    ],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);

app.use(express.json({ limit: "1mb" }));

app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 300,
    standardHeaders: "draft-7",
    legacyHeaders: false,
  }),
);

app.get("/", (_req, res) => {
  res.status(200).json({
    success: true,
    message: "Student Management API is running",
  });
});

app.get("/health", (_req, res) => {
  res.status(200).json({
    success: true,
    message: "API is healthy",
  });
});

app.use("/api/students", studentRoutes);

app.use((_req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

app.use(errorHandler);
