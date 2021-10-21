const inquirer = require("inquirer");
const confirm = require("inquirer-confirm");
const mysql = require("mysql2");
require("dotenv").config();
const cTable = require("console.table");

const port = process.env.port || 3000;

// mysql

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Jingers.5",
  database: "employees_db",
});

// create the connection to mysql database
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
});

employeeApp();

function employeeApp() {
  inquirer
    .prompt({
      name: "choices",
      type: "list",
      message: "What would you like to do?",
      choices: [
        {
          name: "View Departments",
          value: "viewDeparments",
        },
        {
          name: "View All Roles",
          value: "viewAllRoles",
        },
        {
          name: "View All Employees",
          value: "viewAllEmployees",
        },
        {
          name: "Add New Department",
          value: "addDepartment",
        },
        {
          name: "All A Role",
          value: "addRole",
        },
        {
          name: "Add an Empolyee",
          value: "addEmployee",
        },
        {
          name: "Update Employee Role",
          value: "updateEmployeeRole",
        },
        {
          name: "Finish",
          value: "finish",
        },
      ],
    })
    .then(function (res) {
      employeeApp(res.choices);
    });
}
