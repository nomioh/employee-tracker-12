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
  db.query("SELECT * FROM role", function (error, res) {
    roles = res.map((dept) => ({
      name: role.title,
      value: role.id,
    }));
    console.table(res);
  });

  // database for depts
  db.query("SELECT * FROM department", function (error, res) {
    roles = res.map((role) => ({
      name: role.name,
      value: role.id,
    }));
  });

  // database for employees
  db.query("SELECT * FROM employee", function (error, res) {
    employees = res.map((emp) => ({
      name: `${emp.first_name} ${emp.last_name}`,
      value: emp.id,
    }));
    employeeApp();
  });

  function employeeApp() {
    inquirer
      .prompt({
        name: "choices",
        type: "list",
        message: "What would you like to do?",
        choices: [
          {
            name: "View Departments",
            value: "viewDepartments",
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
        menu(res.choices);
      });
  }

  // allows user to switch between options

  function menu(options) {
    switch (options) {
      case "viewDepartments":
        viewDepartments();
        break;
      case "viewAllRoles":
        viewAllRoles();
        break;
      case "viewAllEmployees":
        viewAllEmployees();
        break;
      case "addDepartment":
        addDepartment();
        break;
      case "addRole":
        addRole();
        break;
      case "addEmployee":
        addEmployee();
        break;
      case "updateEmployeeRole":
        updateEmployeeRole();
        break;
      case "finish":
        finish();
    }
  }
});

// functions for each menu option
function viewAllRoles() {
  db.query("SELECT * FROM role", function (error, res) {
    roles = res.map((role) => ({
      name: role.name,
      value: role.id,
    }));
    console.table(res);
    exitMenu();
  });
}

function viewAllEmployees() {
  db.query("SELECT * FROM employee", function (error, res) {
    employees = res.map((emp) => ({
      name: `${emp.first_name} ${emp.last_name}`,
      value: emp.id,
    }));
    console.table(res);
    exitMenu();
  });
}

function addDepartment() {
  inquirer
    .prompt([
      {
        type: "input",
        message: "New Department Name:",
        name: "name",
      },
    ])
    .then(function (response) {
      newDepartment(response);
    });
}

function newDepartment(data) {
  db.query(
    "INSERT INTO department SET ?",
    {
      name: data.name,
    },
    function (error, res) {
      if (error) throw error;
    }
  );
  exitMenu();
}
