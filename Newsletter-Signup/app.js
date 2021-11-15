const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https")

const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req,res){
    res.sendFile(__dirname + "/signup.html");
})

app.post("/", function(req, res){
    const firstName = req.body.fName;
    const lastName = req.body.lName;
    const email = req.body.email;

    const data = {
        members: [{
            email_address: email,
            status: "subscribed",
            merge_fields:{
                FNAME: firstName,
                LNAME: lastName
            }
        }]
    };

    const jsonData = JSON.stringify(data);

    const url = "https://us20.api.mailchimp.com/3.0/lists/ae88e9bbca"

    const options = {
        method: "POST",
        auth: "phongbui:3217c2ff7f40041255ef3f57aeaf54ad-us20"
    }

    const request = https.request(url, options, function(response){

        if (response.statusCode === 200){
            res.send("Succesfully Subscribed")
        } else {
            res.send("There was an error with signing up, please try again!")
        }

        response.on("data", function(parsedData){
            console.log(JSON.parse(parsedData));
        })
    })

    request.write(jsonData);
    request.end();

    console.log(firstName, lastName, email);
})

app.listen(process.env.PORT || 3000, function(){
    console.log("Server is running on port 3000");
})

//API KEY
// 3217c2ff7f40041255ef3f57aeaf54ad-us20

//list id
// ae88e9bbca