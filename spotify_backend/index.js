// npm init :: package.jason --- This a node project.
// npm i express :: expressJs package install kiya. project ko pta chla ki express use kr rhe h.
// we are finally using express.

const express = require("express"); // yha mene package variable m carry kiya h.
const mongoose = require("mongoose"); // yha mene mongoose require kiya h
const JwtStrategy = require("passport-jwt").Strategy,
  ExtractJwt = require("passport-jwt").ExtractJwt;
const passport = require("passport");
const User = require("./models/User");
const authRoutes = require("./routes/auth");
const songRoutes = require("./routes/song");
const playlistRoutes = require("./routes/playlist");
const app = express(); // kyuki upr vala variable as a function use ho rha h.
require("dotenv").config();
const cors = require("cors");
const port = 8000; // will be used as a port number.
app.use(cors());
app.use(express.json()); // req.bosy ko json m convert krega.

///connect mongodb to our node app.
//mongoose.connect 2 arguments : 1. Which db to connect (db url), 2. Connection option
mongoose
  .connect(
    "mongodb+srv://admin21:" +
      "b6JPFVP5dihygePP" +
      "@cluster0.4b726vx.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then((x) => {
    console.log("Connected to mongo!");
  })
  .catch((err) => {
    console.log(err);
  });

// setup passport-jwt

let opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = "secretKey";
passport.use(
  new JwtStrategy(opts, async function (jwt_payload, done) {
    try {
      const user = await User.findOne({ id: jwt_payload.sub });
      if (user) {
        return done(null, user);
      } else {
        return done(null, false);
        // or you could create a new account
      }
    } catch (err) {
      return done(err, false);
    }
  })
);

// we will create an API :: GET type , which will return hello world.

// app.get("/", (req, res) => {});
// In first argument >> it is a route where API will run.
// for second argumennt as a function >> what will do when "get" request place on the "/" url.

app.get("/", (req, res) => {
  //req contains all the data for the request.
  //res contain all the data for response.
  res.send("Hello World");
});

app.use("/auth", authRoutes);
app.use("/song", songRoutes);
app.use("/playlist", playlistRoutes);

//Now we want to tell express that out server will run on localhost:8000
app.listen(port, () => {
  console.log(`App is running  on port  ${port}`);
});
