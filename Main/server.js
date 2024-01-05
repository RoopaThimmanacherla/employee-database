const inquirer = require('inquirer');
const mysql = require('mysql2');

//connect to database
const db = mysql.createConnection(
    {
      host: 'localhost',
      // MySQL username,
      user: 'root',
      // TODO: Add MySQL password here
      password: '',
      database: 'employees_db'
    },
    console.log(`Connected to the employees_db database.`)
  );

const promptUser = () => {

inquirer.prompt([
    {
        type:'list',
        name: 'task',
        message:'please select an option:',
        choices:[
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
.then((answers)=>{

    const {task} = answers;
    if(task ==='View All Employees'){
        viewAllEmployees();
    }else
    if(task ==='View All Roles'){
        viewAllRoles();
    }else
    if(task ==='View All Departments'){
        viewAllDepartments();
    }else
    if(task ==='Add Employee'){
        addEmployee();
    }else
    if(task ==='Add Department'){
        addDepartment();
    }else
    if(task ==='Update Employee Role'){
        updateEmployeerole();
    }
});
}

const viewAllDepartments = ()=>{
    sql = `select id,department_name from departments`;
    db.query(sql,(err,rows)=>{
        if(err){
            throw err;
        }else
        console.log(rows);
    })
    promptUser();
} 

promptUser();
