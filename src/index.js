const express = require("express");
const bodyParser = require("body-parser");
const req = require("express/lib/request");
const app = express();
const mysql = require("mysql");
const { status } = require("express/lib/response");


app.use(bodyParser.json());


const conn = mysql.createConnection({
    host: "localhost",
 user: "root",
 password: "",
 database: "hr_database",
});

conn.connect((err)=>{
    if(err) throw err;
    console.log("mysql connected");
});



app.post("/api/create",(req,res)=>{
    let data ={ name: req.body.name, location: req.body.location};
    let sql = "INSERT INTO add_employee SET ?";
    let querry = conn.query(sql,data,(err, result)=>{
        if(err) throw err;
        res.send(JSON.stringify({status: 200, error: null, response: "New Record added successfully"}));
    });
})


app.get("/api/view",(req,res)=>{
    let sql = "SELECT * FROM add_employee";
    let query = conn.query(sql,(err,result)=>{
        if(err) throw err;
        res.send(JSON.stringify({status: 200, error: null, response:res}));
    });
});


app.get("/api/view/:id",(req,res)=>{
    let sql = "SELECT * FROM add_employee WHERE emp_code="+req.params.id;
    let querry = com.query(sql,(err,result)=>{
        if(err) throw err;
        res.send(JSON.stringify({status: 200, error: null, response:res}));
    });
});


app.put("/api/upfate",(req,res)=>{
    let sql = "UPDATE add_employee SET emp_code='"+req.body.emp_code+"', name='"+req.body.name+"', department='"+req.body.department+"', gender='"+req.body.gender+"', bod='"+req.body.bod+"', joining_date='"+req.body.joining_date+"', prev_experience='"+req.body.prev_experience+"', salary='"+req.body.salary+"', address='"+req.body.address;
    let querry= conn.querry(sql,(err,result)=>{
        if (err) throw err
        res.send(JSON.stringify({status: 200, error: null, response: "Record updated"}));
    });
});


app.delete("/api/delete/:id",(req,res)=>{
    let sql="DELETE FROM add_employee WHERE emp_code="+req.params.emp_code;
    let querry= conn.querry(sql,(err,result)=>{
    if (err) throw err 
    res.send(JSON.stringify({status: 200, error: null, response: "Record deleted"}));
});
});


app.listen(8000, () => {
    console.log("server started on port 8000");
});