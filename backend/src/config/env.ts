
import dotenv from "dotenv";

dotenv.config();

export const env = {
  nodeEnv: process.env.NODE_ENV || "development",

  port: Number(process.env.PORT || 3000),

  databaseUrl: process.env.DATABASE_URL,

  dbHost: process.env.DB_HOST || "localhost",
  dbPort: Number(process.env.DB_PORT || 5432),
  dbName: process.env.DB_NAME || "student_management",
  dbUser: process.env.DB_USER || "app_user",
  dbPassword: process.env.DB_PASSWORD || "app_password",

  dbSsl: process.env.DB_SSL === "true",

  corsOrigin: process.env.CORS_ORIGIN || "http://localhost:4200",

  cloudinaryCloudName: process.env.CLOUDINARY_CLOUD_NAME || "ckmktqu0",
  cloudinaryApiKey: process.env.CLOUDINARY_API_KEY || "798847429674224",
  cloudinaryApiSecret: process.env.CLOUDINARY_API_SECRET || "3HzGHR2QPSGsORUeaZ0fWiHtwUQ",

  maxUploadMb: Number(process.env.MAX_UPLOAD_MB || 5),
};
