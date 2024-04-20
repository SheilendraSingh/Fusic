// npm init :: package.jason --- This a node project.
// npm i express :: expressJs package install kiya. project ko pta chla ki express use kr rhe h.
// we are finally using express.

const express = require("express"); // yha mene package variable m carry kiya h.
const app = express(); // kyuki upr vala variable as a function use ho rha h.
const port = 8000; // will be used as a port number.

// we will create an API :: GET type , which will return hello world.

// app.get("/", (req, res) => {});
// In first argument >> it is a route where API will run.
// for second argumennt as a function >> what will do when "get" request place on the "/" url.

app.get("/", (req, res) => {
  //req contains all the data for the request.
  //res contain all the data for response.
  res.send("Hello World");
});

//Now we want to tell express that out server will run on localhost:8000
app.listen(port, () => {
  console.log("App is running  on port " + port);
});
