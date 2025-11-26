import fs, { readFileSync } from "fs";
import path from "path";
import { figletMessage } from "../utils/figlet.js";
import { log } from "../utils/print.js";
import chalk from "chalk";

const DATABSE_PATH = path.join(process.cwd(), "db.json");

async function connectDB() {
  if (!fs.existsSync(DATABSE_PATH)) {
    fs.writeFileSync(DATABSE_PATH, JSON.stringify([]));
    await figletMessage("database created!");
  }
}

function saveExpenses(expenses) {
  fs.writeFileSync(DATABSE_PATH, JSON.stringify(expenses, null, 2));
  log(chalk.green("✔ Expenses saved to database!"));
}

async function loadExpenses() {
  await connectDB();
  return JSON.parse(readFileSync(DATABSE_PATH, "utf-8"));
}

export { saveExpenses, loadExpenses };
