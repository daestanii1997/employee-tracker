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

            console.log('You are viewing all employees')

            db.query('SELECT employee.employee_id, employee.first_name, employee.last_name, role.title, role.salary, department.name AS department, employee.manager_id FROM employee LEFT JOIN role ON employee.role_id = role.role_id LEFT JOIN department ON role.department_id=department.department_id;', function (err, results) {
                
                console.table(results);
            })

            userSelection();
        } 

        // Add employees

        else if (answers.choices === 'Add employee'){

            console.log('Add employee');

            userSelection();
            
        }

        // Update employee role

        else if (answers.choices === 'Update employee role'){

            console.log('Update employee role');

            userSelection();
            
        }

        // View all roles

        else if (answers.choices === 'View all roles'){

            console.log('You are viewing all roles')

            db.query('SELECT role.role_id, role.title, department.name AS department, role.salary FROM role INNER JOIN department ON role.department_id = department.department_id;', function (err, results) {
                console.table(results);
            })

            userSelection();

        }

        // Add role

        else if (answers.choices === 'Add role'){

            console.log('Add role');
            
            userSelection();

        }

        // View all employees

        else if (answers.choices === 'View all departments'){

            console.log('You are viewing all departments')

            db.query('SELECT * FROM department', function (err, results) {
                console.table(results);
                console.log(results);
            })

            userSelection();
        }

        // Add department

        else if (answers.choices === 'Add department'){

            console.log('Add department');

            userSelection();
            
        }

        // Quit

        else if (answers.choices === 'Quit'){

            db.end();

            console.log('Quit')
        }
    })
}

userSelection();