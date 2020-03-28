const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");

const app = express();

app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(express.static("Public"));

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/signup.html");
})

app.post("/", function(req, res) {
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const email = req.body.email;

  const data = {
    members : [
      {
        email_address : email,
        status : "subscribed",
        merge_fields : {
          FNAME : firstName,
          LNAME : lastName
        }
      }
    ]
  }

  const jsondata = JSON.stringify(data);

  const url = "https://us19.api.mailchimp.com/3.0/lists/228a10a8f8";
  const options = {
    method : "POST",
    auth : "vipin:aa82d59eaa675a28a001aaeb85c4b14a-us19"
  }

  const request = https.request(url, options, function(response) {
    response.on("data", function(data) {
      console.log(JSON.parse(data))
    })

    if(response.statusCode == 200)
    res.sendFile(__dirname + "/success.html")
    else res.sendFile(__dirname + "/failure.html")
  })



  request.write(jsondata);
  request.end();
});

app.post("/failure.html", function(req, res) {
  res.redirect("/")
})


// List ID
// 228a10a8f8


// API key
// aa82d59eaa675a28a001aaeb85c4b14a-us19








app.listen(process.env.PORT || 3000, function() {
  console.log("server is running on port no 3000");
})
