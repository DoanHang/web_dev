const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res){
    res.sendFile(__dirname + "/index.html");
})

app.post("/", function(req,res){
    console.log("Post request received");

    const query = req.body.cityName;
    const apiKey = "ba6667efb83264243aed59b89b48872a";
    const unit = "metric";
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query +"&appid=" + apiKey + "&units=" + unit;

    https.get(url, function(response){
        console.log(response.statusCode);

        response.on("data", function(data){
            const weatherData = JSON.parse(data)
            const temp = weatherData.main.temp
            const weatherDescription = weatherData.weather[0].description
            const icon = weatherData.weather[0].icon
            const imageURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png"
            console.log(temp, weatherDescription, icon);
            res.write("<h1>The Current Temperature in " + query + " is " + temp +  "</h1>");
            res.write("<p>The weather is currently " + weatherDescription +"</p>");
            res.write("<img src=" + imageURL + ">");
            res.send();
        })
    })
})

app.listen(3000, function(){
    console.log("Server is running on port 3000");
})


