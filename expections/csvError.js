class CSVCreationError extends Error {
  constructor(msg) {
    super(msg);
    this.name = "csv error";
  }
}

export { CSVCreationError };
