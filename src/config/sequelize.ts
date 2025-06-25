import "dotenv/config";
import { Sequelize } from "sequelize-typescript";
import { UrlLink } from "../module/url/schema";

const DATABASE_URL = process.env.CONNECT_DB;

if (!DATABASE_URL) {
  throw new Error("DATABASE_URL not found");
}

export const sequelize = new Sequelize(DATABASE_URL, {
  dialect: "postgres",
  models: [UrlLink],
  logging: false, // false disable logging
});



