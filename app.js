//this is the first js file 
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
    database: "quiz_data"
});

//check database connection
con.connect(function (err) {
    if (err) throw err;
    console.log("Connected");
});

//get all data

app.get('/user', (req, res) => {
    var sql = "select * from quiz_ans"
    con.query(sql, function (err, result) {
        if (err) {
            throw err;
            console.log(result);
        }
        if (result.length > 0) {
            res.send({
                message: "All user data",
                data: result
            });
        }
    });
});

//get single data
app.get('/user/:id', (req, res) => {
    let gID = req.params.id;
    var sql = `select * from quiz_ans where id= ${gID}`;
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

//create data
app.post('/user', (req, res) => {
    console.log("create data");
    let ID = req.body.id;
    let user_name = req.body.User_name;
    let ans1 = req.body.Ans1;
    let ans2 = req.body.Ans2;
    let ans3 = req.body.Ans3;
    let ans4 = req.body.Ans4;
    let ans5 = req.body.Ans5;
    let ans6 = req.body.Ans6;
    let ans7 = req.body.Ans7;
    let ans8 = req.body.Ans8;
    let ans9 = req.body.Ans9;
    let ans10 = req.body.Ans10;
    let marks = req.body.Marks;

    let sql = `insert into quiz_ans(id, User_name, Ans1, Ans2, Ans3, Ans4, Ans5, Ans6, Ans7, Ans8, Ans9, Ans10, Marks)
               values ('${ID}', '${user_name}', '${ans1}', '${ans2}', '${ans3}', '${ans4}', '${ans5}', '${ans6}', '${ans7}', '${ans8}', '${ans9}', '${ans10}', '${marks}')`;
    con.query(sql, function (err, result) {
        if (err) {
            throw err;
            console.log(err);
        }
        console.log("result", result);
        res.send({
            message: "data inserted"
        });
    });

});


//update single data
app.put('/user/:id', (req, res) => {
    console.log("update data");

    let gID = req.params.id;
    let ID = req.body.id;
    let user_name = req.body.User_name;
    let ans1 = req.body.Ans1;
    let ans2 = req.body.Ans2;
    let ans3 = req.body.Ans3;
    let ans4 = req.body.Ans4;
    let ans5 = req.body.Ans5;
    let ans6 = req.body.Ans6;
    let ans7 = req.body.Ans7;
    let ans8 = req.body.Ans8;
    let ans9 = req.body.Ans9;
    let ans10 = req.body.Ans10;
    let marks = req.body.Marks;

    let sql = `update quiz_ans set User_name = ${'user_name'} where id= ${gID}`;
    con.query(sql, (err, result) => {
        if (err) { console.log(err); }
        res.send({
            message: "data updated"
        });
    })
});


app.listen(3000, () => {
    console.log("Running PORT 3000")
});