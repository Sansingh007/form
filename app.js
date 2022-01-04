const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const app = express();
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use(express.static("files"));

var bool = true;

var conn = mongoose.createConnection(
  "mongodb+srv://sandesh:sandesh@cluster0.fazrr.mongodb.net/studentDB?retryWrites=true&w=majority"
);




var Student = conn.model(
  "Student",
  new mongoose.Schema({
    fName: String,
    lName:String,
    number: Number,
    email: String,
    password:String,
    options:String,
    date:String,
    msg:String,
  })
);


app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});





app.post("/", function (req, res) {
//Accepting the data
  const fName = String(req.body.fname);
  const lName = String(req.body.lname);
  const number = (req.body.number);
  const email = req.body.email;
  const password = String(req.body.password);
  const options = String(req.body.options);
  const date = String(req.body.date);
  const msg = String(req.body.msg);



  const student = new Student({
    fName: fName,
    lName: lName,
    number:number,
    email: email,
    password:password,
    options:options,
    date:date,
    msg:msg,
  });

  student.save(function (err) {
    if (!err) {
      res.redirect("/");
    } else {
      res.sendFile(__dirname + "/err.html");
    }
  });

  //Testing Purpose
  // console.log(name);
  // console.log(email);
  // console.log(size);
});


let port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
}

app.listen(port, function () {
  console.log("Sandesh's server up and running at 3000");
});
