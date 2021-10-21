const inquirer = require("inquirer");
const confirm = require("inquirer-confirm");
const db = require("./db/connection");
require("dotenv").config();
const cTable = require("console.table");
const { end } = require("./db/connection");

// create the connection to mysql database
db.connect(function (error) {
  if (error) throw error;
  console.log("Welcome to Employee Manager");

  db.query("SELECT * FROM role", function (error, res) {
    roles = res.map((role) => ({
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
        type: "list",
        name: "choices",
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
        end();
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

// function addDepartment(data) {
//   db.query(
//     "INSERT INTO department SET ?",
//     {
//       name: data.name,
//     },
//     function (error, res) {
//       if (error) throw error;
//     }
//   );
//   exitMenu();
// }
function viewDepartments() {
  db.query("SELECT * FROM department", function (error, res) {
    console.table(res);
    exitMenu();
  });
}

function addEmployee() {
  inquirer
    .prompt([
      {
        type: "input",
        message: "What is the employee's first name?",
        name: "firstName",
      },
      {
        type: "input",
        message: "What is the employee's last name?",
        name: "lastName",
      },
      {
        type: "list",
        message: "What is the title of the employee?",
        name: "title",
        choices: roles,
      },
      {
        type: "list",
        message: "Who is the manager of the employee?",
        name: "manager",
        choices: employees,
      },
    ])
    .then(function (response) {
      newEmployee(response);
    });
}

function addRole() {
  inquirer
    .prompt([
      {
        type: "input",
        message: "What is the name of the new role?",
        name: "title",
      },
      {
        type: "input",
        message: "What department does this new role belong to?",
        name: "id",
        choices: dept,
      },
      {
        type: "list",
        message: "what is the salary of the new role?",
        name: "salary",
      },
    ])
    .then(function (response) {
      addNewRole(response);
    });
}

function addNewRole(data) {
  db.query(
    "INSTERT INTO role SET ?",
    {
      title: data.title,
      salary: data.salary,
      department_id: data.id,
    },
    function (error, res) {
      if (error) throw error;
    }
  );
  exitMenu();
}

function newEmployee(data) {
  db.query(
    "INSERT INTO employee SET ?",
    {
      first_name: data.firstName,
      last_name: data.lastName,
      role_id: data.title,
      mgmt_id: data.manager,
    },
    function (error, res) {
      if (error) throw error;
    }
  );
  exitMenu();
}

function updateEmployeeRole() {
  inquirer
    .prompt([
      {
        type: "list",
        message: "Which employee is updating their role?",
        name: "employee_id",
        choices: employees,
      },
      {
        type: "list",
        message: "What is the new role?",
        name: "titleID",
        choices: roles,
      },
    ])
    .then(function (response) {
      updateRole(response);
    });
}

function updateRole(data) {
  db.query(
    `UPDATE employee SET role_id = ${data.titleID} WHERE id=${data.employeesID}`,
    function (error, res) {
      if (error) throw error;
    }
  );
  exitMenu();
}

//exit menu for user to exit or continue

function exitMenu() {
  confirm("Would you like to continue?").then(
    function confirmed() {
      employeeApp();
    },
    function cancelled() {
      exit();
    }
  );
}

// closes the employee manager app

function exit() {
  console.log("Exiting Employee Manager App");
  db.exit();
  process.exit();
}
