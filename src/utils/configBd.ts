import { Sequelize } from "sequelize";
import sqlite3 from "sqlite3";


export const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "./database.bd",
  dialectModule: sqlite3
});
