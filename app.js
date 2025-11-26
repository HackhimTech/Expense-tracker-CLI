import { program } from "commander";
import {
  addExpense,
  deleteExpenseById,
  getExpensesSumary,
  listAllExpenses,
  updateExpenseById,
} from "./services/expenseSevices.js";
import { ExpenseNotFound } from "./expections/expenseErrors.js";
import { log } from "./utils/print.js";
import chalk from "chalk";

program.name("app.js").description("Expense tracker CLI").version("1.0.0");

// parent command
const expense = program
  .command("expense-tracker")
  .description("Commads related to expense tracking");

// child commands
expense
  .command("add")
  .description("Add new expense")
  .requiredOption("-d, --description <description>", "Expense description")
  .requiredOption("-a, --amount <amount>", "Expense amount description")
  .action(addExpense);

expense.command("list").description("List all expense").action(listAllExpenses);

expense
  .command("delete")
  .description("Delete a single expense")
  .option("--id <id>", "Expense Id")
  .action(deleteExpenseById);

expense
  .command("update")
  .description("Update an expense")
  .requiredOption("--id <id>", "Expense Id")
  .requiredOption("-d, --description <description>", "Expense new description")
  .action(async (option) => {
    try {
      await updateExpenseById(option);
      process.exit(0);
    } catch (err) {
      if (err instanceof ExpenseNotFound) {
        log(chalk.red("Failed:", err.message));
      } else {
        log(chalk.red("Error deleting:", err.message));
      }
      process.exit(1);
    }
  });

expense
  .command("summary")
  .description("Display total expenses")
  .option("-m, --month <month>", "Filter summary by month (MM)")
  .option("-d, --day <day>", "Filter summary by day (DD)")
  .action(getExpensesSumary);

program.parse(process.argv);
