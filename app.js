var mysql = require('mysql');

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "quiz_data"
});

con.connect(function(err){
    if (err) throw err;
    console.log("Connected");
    var sql = "select * from quiz_ans"
    con.query(sql, function(err, result){
        if (err) throw err;
        console.log(result);
    })
})