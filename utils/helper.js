function now() {
  return Date.now();
}

function formatDate(date) {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const dt = date.getDate() + 1;

  return `${year}-${month}-${dt}`;
}

export { now, formatDate };
