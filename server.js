const mysql = require("mysql2");
const inquirer = require("inquirer");

const db = mysql.createConnection(
  {
    host: "localhost",
    user: "root",
    password: "NikitaKai",
    database: "employees_db",
  },
  console.log("Connected to employees_db database")
);

const userSelection = () => {
  inquirer
    .prompt([
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
        ],
      },
    ])
    .then((answers) => {
      // View all Employees
      if (answers.choices === "View all employees") {
        
        viewEmployees();
      }

      // Add employees
      else if (answers.choices === "Add employee") {
        console.log("..\n");
        addEmployee();
      }

      // Update employee role
      else if (answers.choices === "Update employee role") {
        console.log("Update employee role");
      }

      // View all roles
      else if (answers.choices === "View all roles") {
        viewRoles();
      }

      // Add role
      else if (answers.choices === "Add role") {
        console.log("Add role");
      }

      // View all departments
      else if (answers.choices === "View all departments") {
        viewDepartments();
      }

      // Add department
      else if (answers.choices === "Add department") {
        console.log("Add department");
      }

      // Quit
      else if (answers.choices === "Quit") {
        db.end();

        console.log("Bye!");
      }

    })
};

userSelection();

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
      console.log("..\n");
      console.log("..\nYou are viewing all employees..\n");
      console.table(results);
      console.log('Press an arrow key to continue or ctr + c to close the application')
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
      console.log("..\n");
      console.log("..\nYou are viewing all roles..\n");
      console.table(results);
      console.log('Press an arrow key to continue or ctr + c to close the application')
    };
  });
};

viewDepartments = () => {
  const query = `SELECT * FROM department`;

  db.query(query, function (err, results) {
    if(err) {
      console.log(err)
    } else {
      console.log("..\n");
      console.log("..\nYou are viewing all departments..\n");
      console.table(results);
      console.log('Press an arrow key to continue or ctr + c to close the application')
    };
  });
};

// Add employee

addEmployee = () => {
  console.log("..\n");
  console.log("..\nYou are adding a employee..\n");
  inquirer
    .prompt([
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
    ])
    // Function stops working here???
    .then((answers) => {

      console.log(answers);
      // const fullName = [answers.firstName, answers.lastName];

      // const roleQuery = `SELECT role.role_id, role.title FROM role`;

      // db.query(roleQuery, (err, response) => {
      //       if(err) {
    //   console.log(err)
    // } else {
    //   console.log("..\n");
    //   console.log("..\nYou are viewing all employees..\n");
    //   console.table(results);
    //   console.log('press an arrow key to continue')
    // };

      //   const roles = response.map(({ id, title }) => ({
      //     name: title,
      //     value: id,
      //   }));

      //   inquirer
      //     .prompt([
      //       {
      //         type: "list",
      //         name: "role",
      //         message: "What is their role?",
      //         choices: roles,
      //       },
      //     ])
      //     .then((roleSelection) => {
      //       const roleChoice = roleSelection.role;
      //       fullName.push(roleChoice);

      //       const mgrQuery = `SELECT * FROM employee`;

      //       db.query(mgrQuery, (err, data) => {
      //         if (err) throw err;

      //         const managerId = data.map(({ id }) => ({ value: id }));

      //         inquirer
      //           .prompt([
      //             {
      //               type: "list",
      //               name: "manager",
      //               message: "What is their managers id?",
      //               choices: managerId,
      //             },
      //           ])
      //           .then((managerIdSelection) => {
      //             const manager = managerIdSelection.manager;
      //             fullName.push(manager);

      //             const addEmployeeQuery = `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)`;

      //             db.query(addEmployeeQuery, fullName, (err, results) => {
      //               if (err) throw err;
      //               console.log("The new employee has been added!..\n");

      //               viewEmployees();
      //             });
      //           });
      //       });
      //     });
      // });
    });
};

addRole = () => {
  console.log("You are adding a role..\n");
};

addDepartment = () => {
  console.log("You are adding a department..\n");
};
