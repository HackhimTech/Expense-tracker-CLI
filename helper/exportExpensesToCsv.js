import { Parser } from "@json2csv/plainjs";
import fs from "fs";
import path, { dirname } from "path";
import { log } from "../utils/print.js";
import { loadExpenses } from "../repository/expenseRepo.js";
import chalk from "chalk";
import { CSVCreationError } from "../expections/csvError.js";

const EXPORT_DIR = path.join(process.cwd(), "csv_export");

async function exportExpensesToCSV() {
  const expenses = await loadExpenses();

  const fields = [
    {
      label: "Id",
      value: "id",
    },
    {
      label: "Date",
      value: "Date",
    },
    {
      label: "Description",
      value: "description",
    },
    {
      label: "Amount",
      value: "amount",
    },
  ];

  try {
    const opts = { fields };
    const parser = new Parser(opts);
    const csv = parser.parse(expenses);

    if (!fs.existsSync("csv_export")) {
      fs.mkdirSync(EXPORT_DIR, { recursive: true });
      log(chalk.green("✅ csv_export folder created in the root folder"));
    } else {
      log(chalk.red("❎ csv_export folder already exsit!"));
    }

    const now = new Date();
    const timestamp = now.toISOString().slice(0, 10);
    const filename = `expenses-export-${timestamp}.csv`;
    const filepath = path.join(EXPORT_DIR, filename);

    fs.writeFile(filepath, csv, (err) => {
      if (err) {
        throw new CSVCreationError(
          chalk.red(`Error writing csv data to ${filepath}`)
        );
      }
      log(
        `✅ Successfully exported ${expenses.length} expenses to: ${filepath}`
      );
    });
  } catch (err) {
    log(chalk.red(err));
  }
}

exportExpensesToCSV();
