//this is the first js files
const express = require('express');
const app = express();
var mysql = require('mysql');

//parse require of content-type application form json
app.use(express.json());

//parse require of content-type application form json urlencoded
app.use(express.urlencoded({
    extended: true
}));

//cors for cors origin resource sharing 
var cors = require('cors');
app.use(cors());

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "student_data"
});

//check database connection
con.connect(function (err) {
    if (err) throw err;
    console.log("Connected");
});

//get all student data

app.get('/student', (req, res) => {
    var sql = `select 
    id, reg_no, username, age, dept
    from student_info`;
    con.query(sql, function (err, result) {
        if (err) {
            throw err;
        }
        if (result.length > 0) {
            res.send({
                message: "All user data",
                data: result
            });
        }
    });
});

//get single student data
app.get('/student/:id', (req, res) => {
    let gID = req.params.id;
    var sql = `select * from student_info where id= ${gID}`;
    con.query(sql, function (err, result) {
        if (err) {
            throw err;
            console.log(err);
        }
        if (result.length > 0) {
            res.send({
                message: "get single data",
                data: result
            });
        } else {
            res.send({
                message: "data not found"
            })
        }
    });
});

//create student data
app.post('/student', (req, res) => {
    console.log("create data");
    let ID = req.body.id;
    let Reg_No = req.body.reg_no;
    let user_name = req.body.username;
    let Age = req.body.age;
    let Dept = req.body.dept;

    let sql = `insert into student_info(id, reg_no, username, age, dept)
               values ('${ID}', '${Reg_No}', '${user_name}', '${Age}', '${Dept}')`;
    con.query(sql, function (err, result) {
        if (err) {
            throw err;
        }
        console.log("result", result);
        res.send({
            message: "data inserted"
        });
    });

});


//update single student data
app.put('/student/:id', (req, res) => {
    console.log("update data");

    let gID = req.params.id;
    let ID = req.body.id;
    let Reg_No = req.body.reg_no;
    let user_name = req.body.username;
    let Age = req.body.age;
    let Dept = req.body.dept;


    let sql = `update student_info set reg_no = '${Reg_No}', username = '${user_name}', age = '${Age}', dept = '${Dept}'  where id= '${gID}'`;
    console.log('UPDATE QUERY: ', sql);
    con.query(sql, (err, result) => {
        if (err) { console.log(err); }
        res.send({
            message: "data updated"
        });
    });
});

//delete single data
app.delete('/student/:id', (req, res) => {
    let qID = req.params.id;
    let sql = `delete from student_info where id='${qID}'`;
    con.query(sql, (err, result) => {
        if (err) { console.log(err); }
        res.send({
            message: "data deleted"
        });
    });
});

app.listen(3000, () => {
    console.log("Running PORT 3000")
});