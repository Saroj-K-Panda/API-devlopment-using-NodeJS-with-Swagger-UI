'use strict';

var util = require('util');
var mysql = require('mysql');

module.exports = {
    getName: getName,
    addEmp: addEmp,
    getEmp:getEmp,
    updateEmp:updateEmp,
    deleteEmp:deleteEmp
};

function getName(req, res) {
    console.log("Hello Saroj");
    var name = req.swagger.params.name.value || 'stranger';
    var retName = util.format('Hello..............., %s!', name);
    res.json(retName);
}

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "mydb"
});

function addEmp(req, res) {
      console.log('req.swagger', req.swagger);
      var empId = req.swagger.params.body.value.empId;
      var empName = req.swagger.params.body.value.empName;
      var Dept = req.swagger.params.body.value.dept;
      var Salary = req.swagger.params.body.value.salary;
      var sql = "INSERT INTO employee(EmpId, EmpName,Dept, Salary) VALUES ("+empId+", '"+empName+"','"+Dept+"',"+Salary+")";
      console.log('sql', sql);
      var responseData = ""; 
      con.connect(function(err) {
        if (err) throw err;  
        con.query(sql, function (err, result) {
          if (err) throw err;
          console.log("1 record inserted");
          responseData = "1 record inserted";
          res.json(result);
        });
      }); 
      responseData = util.format('1 record inserted');
      res.json(responseData);
}

function getEmp(req, res) {
  console.log('req.swagger', req.swagger);
  var empId = req.swagger.params.empId.value; 
  var selectsql = "select * from employee where EmpId = "+empId+"";
  console.log('selectsql', selectsql);
  var responseData = ""; 
  con.connect(function(err) {
    if (err) throw err;  
    var data = con.query(selectsql, function (err, result) {
      if (err) throw err;
      console.log("1 record selected");
      console.log('result============================================', result);
      console.log('result============================================', result[0].EmpId);
      responseData = result;
      res.json(result);
    });
  }); 
  console.log('responseData', responseData);
  //var response = util.format(responseData);
  var response =JSON.stringify(responseData);
  console.log('response', response);
  //res.json(response);
}


function updateEmp(req, res)
{
      var empId = req.swagger.params.body.value.empId;
      var Dept = req.swagger.params.body.value.dept;
      var Salary = req.swagger.params.body.value.salary;
      var sqlUpdate = "UPDATE employee SET Dept = '"+Dept+"',Salary = "+Salary+" WHERE EmpId ="+empId+"";           
      console.log('sqlUpdate', sqlUpdate);
      var responseData = ""; 
      con.connect(function(err) {
        if (err) throw err;  
        con.query(sqlUpdate, function (err, result) {
          if (err) throw err;
          console.log("1 record updated");
          responseData = result;
          res.json(result);
        });
      }); 
      responseData = util.format('1 record updated');
      //res.json(responseData);
}

function deleteEmp(req, res)
{
  var empId = req.swagger.params.body.value.empId;
  var sqlDelete = "DELETE FROM employee WHERE EmpId ="+empId+"";
  console.log('sqlDelete', sqlDelete);
      var responseData = ""; 
      con.connect(function(err) {
        if (err) throw err;  
        con.query(sqlDelete, function (err, result) {
          if (err) throw err;
          console.log("1 record deleted");
          responseData = "1 record deleted";
        });
      }); 
      responseData = util.format('1 record deleted');
      res.json(responseData);
}


