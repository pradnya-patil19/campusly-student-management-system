require("dotenv").config();
const common = {
  dialect: "postgres",
  logging: false,
  ...(process.env.DATABASE_URL
    ? { use_env_variable: "DATABASE_URL" }
    : {
        host: process.env.DB_HOST || "localhost",
        port: Number(process.env.DB_PORT || 5432),
        database: process.env.DB_NAME || "student_management",
        username: process.env.DB_USER || "app_user",
        password: process.env.DB_PASSWORD || "app_password",
      }),
};
module.exports = {
  development: common,
  test: common,
  production: {
    ...common,
    ...(process.env.DB_SSL === "true"
      ? {
          dialectOptions: { ssl: { require: true, rejectUnauthorized: false } },
        }
      : {}),
  },
};
