const mysql = require("mysql2");
const PORT = process.env.PORT || 3000;

// mysql

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Jinger.5",
  database: "employees_db",
});

module.exports = db;
