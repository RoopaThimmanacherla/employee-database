const inquirer = require('inquirer');
const mysql = require('mysql2');
const cTable = require('console.table');

//connect to database
const db = mysql.createConnection(
    {
        host: 'localhost',
        // MySQL username,
        user: 'root',
        // TODO: Add MySQL password here
        password: 'Reddy@143',
        database: 'employees_db'
    },
    console.log(`Connected to the employees_db database.`)
);

const promptUser = () => {

    inquirer.prompt([
        {
            type: 'list',
            name: 'task',
            message: 'please select an option:',
            choices: [
                'View All Employees',
                'View All Roles',
                'View All Departments',
                'Add Employee',
                'Add Role',
                'Add Department',
                'Update Employee Role'
            ]
        },
    ])
        .then((answers) => {

            const { task } = answers;
            if (task === 'View All Employees') {
                viewAllEmployees();
            } else
                if (task === 'View All Roles') {
                    viewAllRoles();
                } else
                    if (task === 'View All Departments') {
                        viewAllDepartments();
                    } else
                        if (task === 'Add Employee') {
                            addEmployee();
                        } else
                            if (task === 'Add Department') {
                                addDepartment();
                            } else
                                if (task === 'Update Employee Role') {
                                    updateEmployeerole();
                                }
        });
}

const viewAllDepartments = () => {
    const sql = `select id,department_name from department`;
    db.query(sql, (err, rows) => {
        if (err) {
            throw err;
        } else
            console.table(rows);
            promptUser();

    })
}

const viewAllRoles = () => {
    const sql = `select role.id,role.title,role.salary,department.department_name from role 
    INNER JOIN department ON role.deparment_id = department.id`;
    db.query(sql, (err, rows) => {
        if (err) {
            throw err;
        } else
            console.table(rows);
            promptUser();

    })

}
promptUser();