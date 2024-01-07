const inquirer = require('inquirer');
const mysql = require('mysql2');
const table = require('console.table');

//connect to database
const db = mysql.createConnection(
    {
        host: 'localhost',
        // MySQL username,Customer
        user: 'root',
        password: '',
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
                                }else
                                if(task=== 'Add Role'){
                                    addRole();
                                }
        });
}

const viewAllDepartments = () => {
    const sql = `select id,department_name from department`;
    db.query(sql, (err, rows) => {
        if (err) {
            throw err;
        } else{
            console.table(rows);
            console.log(rows);
            promptUser();
        }

    })
}

const viewAllRoles = () => {
    const sql = `select role.id,role.title,role.salary,department.department_name from role 
    INNER JOIN department ON role.department_id = department.id`;
    db.query(sql, (err, rows) => {
        if (err) {
            throw err;
        } else{
            console.table(rows);
            promptUser();
        }

    })

}
 const viewAllEmployees=()=>{
    const sql= `SELECT e.id,
    e.first_name,e.last_name,
     r.id,r.title,r.salary,
     d.department_name,CONCAT(manager.first_name," ",manager.last_name) AS Manager FROM employee e
    LEFT JOIN role r ON e.role_id=r.id
    LEFT JOIN  department d ON r.department_id=d.id
    LEFT JOIN employee manager ON e.manager_id =manager.id;`

    db.query(sql,(err,rows)=>{
        if(err){
            throw err;
        }else{
            console.table(rows);
            promptUser();
        }
    })
 }

 const addDepartment=()=>{
    inquirer.prompt([
        {
type:'input',
name: 'departmentName',
message:'Please enter departmentName:',
validate: departmentName=>{
    if(departmentName){
        return true;
    }else{
        console.log("Please enter a department name");
        return false;
    }
}


        },
    ])
    .then((answers)=>{
        const sql =`INSERT INTO department(department_name) values(?);`
        const {departmentName} = answers;
        db.query(sql,departmentName,(err,rows)=>{
            if(err){
                throw err;
            }else{
                console.log(`Added ${departmentName} to departments!`);
                viewAllDepartments();
            }
        })
    })
 }

 const addRole=()=>{
   
    inquirer.prompt([
        {
            type:'input',
            name:'roleName',
            message:'Please enter the role name :',
            validate: roleName=>{
                if(roleName){
                    return true;
                }else{
                    console.log("Please enter the role name:");
                    return false;
                }
            }
        },
        {
            type: 'input',
            name:'salary',
            message:'Please enter the salary for the role:',
            validate:salary=>{
                if(salary){
                    return true;
                }else{
                    console.log("Please enter the salary!");
                    return false;
    }
}
        },
       
    ])
    .then((answers)=>{
        const {roleName,salary} =answers;
        const params=[roleName,salary];

        const depQuery = `select department_name from department`;
    
        db.query(depQuery,(err,result)=>{
            if(err){
                throw err;
            }else{
                console.log(result);
                const depArray= result.map(dep=>dep.department_name);
                console.log(depArray);
        

                inquirer.prompt([
                    
                        {
                            type: 'list',
                            name:'department',
                            message:'Select the department for the role:',
                            choices:depArray,
                            validate: department=>{
                             if(department){
                                 if(department){
                                     return true;
                 
                                 }else{
                                     console.log("Please select the department!");
                                     return false;
                                 }
                             }
                            }
                         }
                    
                ])
                .then((answers)=>{
                    const {department}=answers;
                    const depIdQuery=`select id from department where department_name=${department};`
                    db.query(depIdQuery,(err,results)=>{
                        if(err){
                            throw err;
                        }else{
                            console.log(results);
                            params.push(results);

                            const sql= `INSERT INTO role(title,salary,department_id)
                            values(?,?,?)`;
                            db.query(sql,params,(err,result)=>{
                                if(err){
                                    throw err;
                                }else{
                                    console.log(`Added ${roleName} to the role`);
                                }
                            })
                        }
                    })
                   
                })
            }
    
        })

    })
   
 }

promptUser();