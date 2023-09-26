const mysql = require('mysql2');
const inquirer = require('inquirer');

const db = mysql.createConnection (
    {
        host: 'localhost',
        user: 'root',
        password: 'NikitaKai',
        database: 'employees_db'
    },
    console.log('Connected to employees_db')
);



const userSelection = () => {
    inquirer.prompt([
       { 
        type: 'list',
        name: 'choices',
        message: 'Please choose what you want to do.',
        choices: [
            'View all employees',
            'Add employee',
            'Update employee role',
            'View all roles',
            'Add role',
            'View all departments',
            'Add department',
            'Quit'
        ]
    }
    ]) .then((answers) => {

        // View all Employees
        if (answers.choices === 'View all employees'){
            viewEmployees();
        } 

        // Add employees

        else if (answers.choices === 'Add employee'){

            console.log('Add employee');

        }

        // Update employee role

        else if (answers.choices === 'Update employee role'){

            console.log('Update employee role');

        }

        // View all roles
        else if (answers.choices === 'View all roles'){
            viewRoles();
        }

        // Add role

        else if (answers.choices === 'Add role'){

            console.log('Add role');
            

        }

        // View all employees
        else if (answers.choices === 'View all departments'){
            viewDepartments();
        }

        // Add department

        else if (answers.choices === 'Add department'){

            console.log('Add department');

            
        }

        // Quit

        else if (answers.choices === 'Quit'){

            db.end();

            console.log('Quit')
        }
        console.clear();
        userSelection();
    })
}

userSelection();

viewEmployees = () => {
    console.log('You are viewing all employees..\n')

    const query = `SELECT employee.employee_id, employee.first_name, employee.last_name, role.title, role.salary, department.name AS department, employee.manager_id FROM employee LEFT JOIN role ON employee.role_id = role.role_id LEFT JOIN department ON role.department_id=department.department_id;`

            db.query(query, function (err, results) {
                
                console.table(results);
            });
};

addEmployee = () => {
    console.log('You are adding a employee..\n');
};

viewRoles = () => {
    console.log('You are viewing all roles..\n')

    const query = `SELECT role.role_id, role.title, department.name AS department, role.salary FROM role INNER JOIN department ON role.department_id = department.department_id;`

    db.query(query, function (err, results) {
        console.table(results);
    })
};

addRole = () => {
    console.log('You are adding a role..\n');
}

viewDepartments = () => {
    console.log('You are viewing all departments..\n')

    const query = `SELECT * FROM department`

    db.query(query, function (err, results) {
        console.table(results);
    })
};

addDepartment = () => {
    console.log('You are adding a department..\n');
};