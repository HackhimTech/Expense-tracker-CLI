import chalk from "chalk";
import { loadExpenses, saveExpenses } from "../repository/expenseRepo.js";
import { formatDate } from "../utils/helper.js";
import { log, table } from "../utils/print.js";
import { ExpenseNotFound } from "../expections/expenseErrors.js";

async function addExpense(options) {
  const expenses = await loadExpenses();
  const { description, amount } = options;

  const expense = {
    id: expenses.length + 1,
    Date: formatDate(new Date()),
    description,
    amount: "$" + amount,
  };

  expenses.push(expense);

  saveExpenses(expenses);
  log(chalk.green(`✅ Expense added successfully (ID: ${expense.id})`));
}

async function listAllExpenses() {
  const expenses = await loadExpenses();
  if (expenses.length === 0) {
    log("No expenses yet!");
  } else {
    table(expenses);
  }
}

async function deleteExpenseById(option) {
  const expenses = await loadExpenses();
  const filteredExpenses = expenses.filter((e) => e.id != option.id);
  log(chalk.green(`✅ Expense deleted successfully!`));
  saveExpenses(filteredExpenses);
}

async function updateExpenseById(option) {
  const expenses = await loadExpenses();
  const { id, description } = option;

  const expense = expenses.find((e) => e.id == id);

  if (!expense) {
    throw new ExpenseNotFound("Expense not found");
  }

  expense.description = description;
  log(chalk.green(`Expense (ID: ${expense.id}) updated successfully!`));
  saveExpenses(expenses);
}

async function getExpensesSumary(option) {
  const expenses = await loadExpenses();

  let cloned = expenses;
  let summary = 0;

  if (option.month) {
    cloned = expenses.filter((e) => e.Date.split("-")[1] === option.month);
  }

  if (option.day) {
    cloned = expenses.filter((e) => e.Date.split("-")[2] === option.day);
  }

  summary = cloned.reduce(
    (acc, current) => acc + parseInt(current.amount.slice(1)),
    0
  );
  log(chalk.bold.bgWhite(` Total expenses: $${summary.toFixed(2)} `));
}

export {
  addExpense,
  listAllExpenses,
  getExpensesSumary,
  deleteExpenseById,
  updateExpenseById,
};
