SELECT employee.id,
employee.first_name,employee.last_name,
 role.id,role.title,role.salary,
 department.department_name,CONCAT(manager.first_name," ",manager.last_name) AS Manager FROM employee 
LEFT JOIN role  ON employee.role_id=role.id
LEFT JOIN  department ON role.department_id=department.id
LEFT JOIN employee manager ON employee.manager_id =manager.id;