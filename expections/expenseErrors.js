class ExpenseNotFound extends Error {
  constructor(msg) {
    super(msg);
    this.name = "EENOTFOUND";
  }
}

export { ExpenseNotFound };
