import { ErrorRequestHandler } from "express";
export const errorHandler: ErrorRequestHandler = (err, _req, res, _next) => {
  if (err?.name === "SequelizeUniqueConstraintError") {
    res
      .status(409)
      .json({ success: false, message: "Email address is already registered" });
    return;
  }
  if (err?.name === "MulterError") {
    res.status(400).json({ success: false, message: err.message });
    return;
  }
  const status = Number(err?.status || 500);
  res
    .status(status)
    .json({
      success: false,
      message:
        status >= 500
          ? "Internal server error"
          : err.message || "Request failed",
    });
};
