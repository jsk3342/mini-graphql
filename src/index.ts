async function loadDatabase() {
  const database = await import("./data/database.js");
  console.log(database);
}

loadDatabase();
