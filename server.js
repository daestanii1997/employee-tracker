const mysql = require("mysql2");
const inquirer = require("inquirer");

// Establishing Connection
const db = mysql.createConnection(
  {
    host: "localhost",
    user: "root",
    password: "NikitaKai",
    database: "employees_db",
  },
  console.log("Connected to employees_db database")
  );
  
  // Menu questions
  const initialQuestions = [
    {
      type: "list",
      name: "choices",
      message: "Please choose what you want to do.",
      choices: [
        "View all employees",
        "Add employee",
        "Update employee role",
        "View all roles",
        "Add role",
        "View all departments",
        "Add department",
        "Quit",
      ]
    }
  ]

  // Main menu function

function userSelection() {
  inquirer.prompt(initialQuestions)
    .then((answers) => {

      // View all Employees
      if (answers.choices === "View all employees") {
        
        viewEmployees();
        
      }

      // Add employees
      else if (answers.choices === "Add employee") {

        addEmployee();

      }

      // Update employee role
      else if (answers.choices === "Update employee role") {

        updateRole();
      
      }

      // View all roles
      else if (answers.choices === "View all roles") {
        
        viewRoles();

      }

      // Add role
      else if (answers.choices === "Add role") {

        addRole();

      }

      // View all departments
      else if (answers.choices === "View all departments") {

        viewDepartments();

      }

      // Add department
      else if (answers.choices === "Add department") {

        addDepartment();
      }

      // Quit
      else if (answers.choices === "Quit") {
        db.end();
        console.log("Bye!");
      }

    })
};

userSelection();

// Add Employee Questions
// finished and tested!! :)
const addEmployeeQuestions = [
  {
    type: "input",
    name: "firstName",
    message: "What is their first name?",
  },
    {
      type: "input",
      name: "lastName",
      message: "What is their last name?",
    },
    {
      type: "list",
      name: "employeeRole",
      message: "What is their role?",
      choices: [
        {
          name: "Customer Service Manager",
          value: "101" 
        },
        {
          name: "Accountant",
          value: "102"
        },
        {
          name: "HR Manager",
          value: "103"
        },
        {
          name: "Customer Service Rep",
          value: "104"
        },
        {
          name: "Accounts Receivable",
          value: "105"
        },
        {
          name: "HR Assistant",
          value: "106"
        },
        {
          name: "Package Handler",
          value: "107"
        }
      ]
    },
    {
      type: "list",
      name: "manager",
      message: "Who is their manager?",
      choices: [
        {
          name: "Aang",
          value: "103"
        },
        {
          name: "Katara",
          value: "101"
        },
       {
        name: "Sokka",
        value: "102"
      }
      ]
    }
];

// Add Employee function & query
addEmployee = () => {
  console.log("..\nYou are adding a employee..\n");
  inquirer
  .prompt(addEmployeeQuestions)
    .then((answers) => {
      const query = `INSERT INTO employee (first_name, last_name, role_id, manager_id)
                      VALUES("${answers.firstName}", "${answers.lastName}", ${answers.employeeRole}, ${answers.manager})`

      db.query(query, function (err, results) {
        if(err) {
          console.log(err);
        } else {
          console.log("..\nThe employee has been added..\n");
          console.log('Press an arrow key to continue or ctr + c to close the application')

          userSelection();
        }
      })      
    });
};

// Update Role questions 
// finished and tested!! :)
const updateRoleQuestions = [
  {
    type: "list",
    name: "employee",
    message: "Which employee would you like to update?",
    choices: [
        {
          name: "Aang",
          value: "1"
        },
        {
          name: "Katara",
          value: "2"
        },
        {
          name: "Sokka",
          value: "3"
        },
        {
          name: "Zuko",
          value: "4"
        },
        {
          name: "Toph",
          value: "5"
        },
        {
          name: "Momo",
          value: "6"
        },
        {
          name: "Appa",
          value: "7"
        },
        {
          name: "King Bumi",
          value: "8"
        }
    ]
  },
    {
      type: "list",
      name: "employeeRole",
      message: "What is their new role?",
      choices: [
        {
          name: "Customer Service Manager",
          value: "101"
        },
        {
          name: "Accountant",
          value: "102"
        },
        {
          name: "HR Manager",
          value: "103"
        },
        {
          name: "Customer Service Rep",
          value: "104"
        },
        {
          name: "Accounts Receivable",
          value: "105"
        },
        {
          name: "HR Assistant",
          value: "106"
        },
        {
          name: "Lawyer",
          value: "107"
        },
        {
          name: "Package Handler",
          value: "108"
        },
        {
          name: "Paralegal",
          value: "109"
        }
      ]
    }
]

// Update role function
updateRole = () => {
  console.log("You are updated an employees role..\n");
  inquirer
  .prompt(updateRoleQuestions)
    .then((answers) => {
      const query = `UPDATE employee 
                    SET role_id = ${answers.employeeRole} 
                    WHERE employee_id = ${answers.employee}`

      db.query(query, function (err, results) {
        if(err) {
          console.log(err);
        } else {
          console.log("..\nThe employees role has been updated..\n");
          console.log('Press an arrow key to continue or ctr + c to close the application')
  
          userSelection();
        }
      })
      
    });
}

// Add role questions
// Done and tested!! :)
const addRoleQuestions = [
  {
    type: "input",
    name: "newRole",
    message: "What role would you like to add?",
  },
  {
    type: "input",
    name: "newRoleId",
    message: "What is the role id?"
  },
  {
    type: "list",
    name: "department",
    message: "What department does this role belong to?",
    choices: [
      {
        name: "Customer Service",
        value: "1"
      },
      {
        name: "Accounting",
        value: "2"
      },
      {
        name: "Human Resources",
        value: "3"
      },
      {
        name: "Warehouse",
        value: "4"
      },
      {
        name: "Legal",
        value: "5"
      }
    ]
  },
  {
    type: "input",
    name: "salary",
    message: "What is the salary for this role?"
  }
];

// Add role function
addRole = () => {
  console.log("You are adding a role..\n");
  inquirer
  .prompt(addRoleQuestions)
    .then((answers) => {
      const query = `INSERT INTO role (role_id, title, department_id, salary)
                      VALUES ("${answers.newRoleId}", "${answers.newRole}", "${answers.department}", "${answers.salary}")`

      db.query(query, function (err, results) {
        if(err) {
          console.log(err);
        } else {
          console.log("..\nThe role has been added..\n");
          console.log('Press an arrow key to continue or ctr + c to close the application')

          userSelection();
        }
      })
    });
};

// Add Department question
// Done and tested! :)
const addDepartmentQuestions = [
  {
    type: "input",
    name: "newDepartment",
    message: "What department would you like to add?"
  }
]

// Add Department function
addDepartment = () => {
  console.log("You are adding a department..\n");
  inquirer
  .prompt(addDepartmentQuestions)
    .then((answers) => {
      const query = `INSERT INTO department (name)
                      VALUES ("${answers.newDepartment}")`

      db.query(query, function (err, results) {
        if(err) {
          console.log(err)
        } else {
          console.log("..\nThe department has been added..\n");
          console.log('Press an arrow key to continue or ctr + c to close the application')
  
          userSelection();
        };
      })
    });
};

  // View all functions
  viewEmployees = () => {
    const query = `SELECT employee.employee_id, 
                      employee.first_name, 
                      employee.last_name, 
                      role.title, 
                      role.salary, 
                      department.name AS department, 
                      employee.manager_id 
                      FROM employee 
                      LEFT JOIN role ON employee.role_id = role.role_id 
                      LEFT JOIN department ON role.department_id=department.department_id`;
  
    db.query(query, function (err, results) {
      if(err) {
        console.log(err)
      } else {
        console.log("..\nYou are viewing all employees..\n");
        console.table(results);
        console.log('Press an arrow key to continue or ctr + c to close the application')

        userSelection();
      };
    });
  };
  
  viewRoles = () => {
    const query = `SELECT role.role_id, 
                      role.title, 
                      department.name AS department, 
                      role.salary 
                      FROM role 
                      INNER JOIN department ON role.department_id = department.department_id`;
  
    db.query(query, function (err, results) {
      if(err) {
        console.log(err)
      } else {
        console.log("..\nYou are viewing all roles..\n");
        console.table(results);
        console.log('Press an arrow key to continue or ctr + c to close the application')

        userSelection();
      };
    });
  };
  
  viewDepartments = () => {
    const query = `SELECT * FROM department`;
  
    db.query(query, function (err, results) {
      if(err) {
        console.log(err)
      } else {
        console.log("..\nYou are viewing all departments..\n");
        console.table(results);
        console.log('Press an arrow key to continue or ctr + c to close the application')

        userSelection();
      };
    });
  };