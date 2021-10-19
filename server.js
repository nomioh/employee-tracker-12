const inquirer = require("inquirer");
const confirm = require("inquirer-confirm");
const mysql = require("mysql2");
require("dotenv").config();
const cTable = require("console.table");

// create the connection to database
db.connect(function (error) {
  if (error) throw error;
  console.log("Welcome to Employee Manager");

  db.query("SELECT * from role", function (error, res) {
    roles = res.map((role) => ({
      name: role.title,
      value: role.id,
    }));
  });
  // database for depts
  db.query("SELECT * from department", function (error, res) {
    roles = res.map((dept) => ({
      name: dept.name,
      value: dept.id,
    }));
  });
  // database for employees
  db.query("SELECT * from employee", function (error, res) {
    roles = res.map((emp) => ({
      name: `${emp.first_name} ${emp.last_name}`,
      value: emp.id,
    }));
  });
  employeeApp();
});
// post in sql

// const connection = mysql.createConnection({
//   host: "localhost",
//   user: "root",
//   database: "test",
// });

connection.connect();

function employeeApp() {
  inquirer
    .prompt({
      name: "action",
      type: "rawlist",
      message: "What would you like to do?",
      choices: ["Add", "Delete", "View", "Update", "Exit"],
    })
    .then((answer) => {
      switch (answer.action) {
        case "Add":
          // code block
          console.log("add");
          break;
        case "Delete":
          // code block
          console.log("delete");
          break;
        case "View":
          // code block
          console.log("view");
          break;
        case "Update":
          // code block
          console.log("update");
          break;
        case "Exit":
          // code block
          process.exit();
          break;
      }

      // Use user feedback for... whatever!!
    })
    .catch((error) => {
      if (error.isTtyError) {
        // Prompt couldn't be rendered in the current environment
        console.log("error with DB");
      } else {
        // Something else went wrong
        console.log("Somethng else went wrong");
      }
    });
}
