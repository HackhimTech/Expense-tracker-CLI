# ExpenseTracker

Simple CLI expense tracker that stores expenses in a local JSON database and can export them to CSV.

## Features

- Add, list, update and delete expenses via CLI
- Summary (total) by month/day
- Export expenses to CSV (`csv_export/expenses-export-YYYY-MM-DD.csv`)
- Human-friendly console output

## Quick links

- CLI entry: [app.js](app.js) — main command definitions and wiring
- Services: [`addExpense`](services/expenseSevices.js), [`listAllExpenses`](services/expenseSevices.js), [`updateExpenseById`](services/expenseSevices.js), [`deleteExpenseById`](services/expenseSevices.js), [`getExpensesSumary`](services/expenseSevices.js) — [services/expenseSevices.js](services/expenseSevices.js)
- DB read/write: [repository/expenseRepo.js](repository/expenseRepo.js)
- CSV export helper: [`exportExpensesToCSV`](helper/exportExpensesToCsv.js) — [helper/exportExpensesToCsv.js](helper/exportExpensesToCsv.js)
- Utilities: [utils/helper.js](utils/helper.js), [utils/print.js](utils/print.js)
- Custom errors: [expections/expenseErrors.js](expections/expenseErrors.js), [expections/csvError.js](expections/csvError.js)

## Requirements

- Node.js (v14+ recommended)
- npm

## Install

1. Open a terminal in the project root:
   - Windows (PowerShell/CMD):
     cd "c:\Users\Hackhim\Desktop\Programming\Challenges\BackendChallenges\ExpenseTracker"
2. Install dependencies:
   npm install

## Usage

Run the CLI via node:

```bash
- #Add an expense
  node app.js expense-tracker add -d "Lunch" -a 12
  #(calls [`addExpense`](services/expenseSevices.js))
```

- List all expenses
  node app.js expense-tracker list
  (calls [`listAllExpenses`](services/expenseSevices.js))

- Delete by id
  node app.js expense-tracker delete --id 2
  (calls [`deleteExpenseById`](services/expenseSevices.js))

- Update an expense
  node app.js expense-tracker update --id 3 -d "New description"
  (calls [`updateExpenseById`](services/expenseSevices.js))

- Summary (total expenses)
  node app.js expense-tracker summary
  node app.js expense-tracker summary -m 10
  node app.js expense-tracker summary -d 26
  (calls [`getExpensesSumary`](services/expenseSevices.js))

- Export CSV
  node helper/exportExpensesToCsv.js
  Output: `csv_export/expenses-export-YYYY-MM-DD.csv` (uses [`exportExpensesToCSV`](helper/exportExpensesToCsv.js))

## Data storage

- File: [db.json](db.json) at project root
- New DB created automatically on first run by [repository/expenseRepo.js](repository/expenseRepo.js)








