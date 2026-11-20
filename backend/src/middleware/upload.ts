import multer from "multer";
import { env } from "../config/env";
export const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: env.maxUploadMb * 1024 * 1024 },
  fileFilter: (_req, file, cb) => {
    if (!["image/jpeg", "image/png", "image/webp"].includes(file.mimetype))
      return cb(new Error("Only JPG, PNG, and WEBP images are allowed"));
    cb(null, true);
  },
});
