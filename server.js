
import { prompt } from 'inquirer';
import cTable from 'console.table';
import express, { urlencoded, json } from 'express';

import { createConnection } from 'mysql2';
import inputCheck from './utils/inputCheck';

const PORT = process.env.PORT || 3001;

const app = express();

app.use(urlencoded({ extended: false}));
app.use(json());

const db = createConnection({
  host: 'localhost',
  port: '3001',
  user: 'root',
  password: 't3xtesFr0mme3x3s',
  database: 'tracker'
},
  console.log('Connected to tracker database.')  
);


function questions(){
  prompt([
    {
      type: 'list',
      name: 'action',
      message: 'What would you like to do?',
      choices: ['view all departments', 'view all roles', 'view all employees', 'add a department', 'add a role', 'add an employee', 'update employee role'],
    }
  ])
  .then((answers) => {
    switch(answers.choice) {
        case 'view all departments':
        viewAllDepts();
        break;
        case 'view all roles':
        viewAllRoles();
        break;
        case 'view all employees':
        viewAllEmployees();
        break;
        case 'add a department':
        addDept();
        break;
        case 'add a role':
        addRole();
        break;
        case 'add an employee':
        addEmployee();
        break;
        case 'update employee role':
        updateEmployee();
        break;
        
    }}
  );
  }
function viewAllDepts() {
  db.query('SELECT * FROM department', function (err, data) {
    console.table(data);
    questions();
  })
};
function viewAllRoles() {
  db.query('SELECT * FROM role', function (err, data) {
    console.table(data);
    questions();
  })
};
function viewAllEmployees() {
  db.query('SELECT * FROM employees', function (err, data) {
    console.table(data);
    questions();
  })
};

function addDept() {
  prompt([{
    type: 'input',
    name: 'dept',
    message: 'Please enter department name.'
  }, ]).then(function(result){
    db.query(`INSERT INTO department (name) VALUES (?)`, function(err, data) {
    if (err) throw err;
    console.table(data);
    questions();
    })
  })
}
function addRole() {
  prompt([{
    type: 'input',
    name: 'title',
    message: 'Please enter role title.'
  },
  {
    type: 'number',
    name: 'salary',
    message: 'Please enter a salary for this title.'
  },
  {
    type: 'number',
    name: 'department_id',
    message: 'Please enter department ID.'
  }
]).then(function(result){
    db.query(`INSERT INTO roles (title, salary, department_id) VALUES (?, ?, ?)`, [result.title, result.salary, result.department_id], function(err, data) {
    if (err) throw err;
    console.table(data);
    questions();
    })
  })
}

function addEmployee() {
  prompt([{
    type: 'input',
    name: 'first_name',
    message: 'Please enter employee first name.'
    },
    {
    type: 'input',
    name: 'last_name',
    message: 'Please enter employee last name.'
    },
    {
    type: 'number',
    name: 'role_id',
    message: 'Please enter employees role ID.'
    },
    {
    type: 'number',
    name: 'manager_id',
    message: 'Please enter the Manager ID for this employee.'
    }
    
    , ]).then(function(result){
    db.query(`INSERT INTO employees (first_id, last_id, role_id, manager_id) VALUES (?, ?, ?, ?)`, [result.firstName, result.lastName, result.roleId, result.managerId], function(err, data) {
    if (err) throw err;
    console.table(data);
    questions();
    })
  })
}

function updateEmployee() {
  prompt([
    {
      type: 'number',
      name: 'employee_id',
      mesasage: 'Please enter employee id number.'
    },
    {type: 'input',
    name: 'first_name',
    message: 'Please enter employee first name.'
    },
    {
    type: 'input',
    name: 'last_name',
    message: 'Please enter employee last name.'
    },
    {
    type: 'number',
    name: 'role_id',
    message: 'Please enter employees role ID.'
    },
    {
    type: 'number',
    name: 'manager_id',
    message: 'Please enter the Manager ID for this employee.'
    }
  ]).then(function (response) {
    db.query(`UPDATE employee WHERE id = ?`, [response.first_name, response.last_name, response.role_id, response.manager_id], function (err, data) {
      console.table(data);
    })
    questions();
  })
}
app.use('/api', apiRoutes);
// Connect to database
            

app.use((req, res) => {
    res.status(404).end();
  });

db.connect( err => {
    if (err) throw err;
    console.log('Database connected');
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
});

//view all departments, view all roles, view all employees, add a department, add a role, add an employee, and update an employee role
