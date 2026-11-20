
import { app } from "./app";
import { env } from "./config/env";
import { sequelize } from "./config/database";

async function startServer() {
  try {
    await sequelize.authenticate();

    console.log("PostgreSQL connected successfully");

    app.listen(env.port, () => {
      console.log(`Server running at http://localhost:${env.port}`);
    });
  } catch (error) {
    console.error("Database connection failed:", error);
    process.exit(1);
  }
}

startServer();
