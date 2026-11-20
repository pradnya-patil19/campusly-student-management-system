
import { Sequelize } from "sequelize";
import { env } from "./env";

const databaseOptions = {
  dialect: "postgres" as const,
  host: env.dbHost,
  port: env.dbPort,
  logging: env.nodeEnv === "development" ? console.log : false,

  dialectOptions: env.dbSsl
    ? {
        ssl: {
          require: true,
          rejectUnauthorized: false,
        },
      }
    : {},

  pool: {
    max: 10,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
};

export const sequelize = env.databaseUrl
  ? new Sequelize(env.databaseUrl, {
      ...databaseOptions,
    })
  : new Sequelize(
      env.dbName,
      env.dbUser,
      env.dbPassword,
      databaseOptions,
    );
