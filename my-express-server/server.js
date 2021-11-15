//jshint esversion:6

const express = require("express");

const app = express();

app.get("/", function(req, res){
  res.send("<h1>Hello, World</h1>");
});

app.get("/contact", function(req, res){
  res.send("Contact me at: boushphong@gmail.com")
})

app.get("/about", function(req, res){
  res.send("I am Phong, I am a Data Analyst")
})

app.listen(1313, function(){
  console.log("Server has started");
});
