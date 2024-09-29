import sqlite3 from "sqlite3";
import { open } from "sqlite";
import { Sequelize } from "sequelize";

export async function openBd() {
  return open({
    filename: "./database.bd",
    driver: sqlite3.Database,
  });
}

export const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "./database.bd",
});
