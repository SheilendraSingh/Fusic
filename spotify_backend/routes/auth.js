const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const getToken = require("../utils/helper");

//this post route user register krega
router.post("/register", async (req, res) => {
  // /register as a post request call hone pr hi yha ka code chlega
  //req. bosy {email, password, firstName, LastName, UserName}
  try {
    const { email, Password, FirstName, LastName, username } = req.body;

    // check the user with the email already exist? If yes, we throe an err.

    //if doest not exist then it's a valid request

    // Create a new User
    // for seurity we gonna hash our password

    const hashedPassword = bcrypt.hash(Password, 10);
    const newUserData = {
      email,
      Password: hashedPassword,
      FirstName,
      LastName,
      username,
    };
    const newUser = await User.create(newUserData);

    // need to create token to return to the user

    const token = await getToken(email, newUser);

    //return the result to user
    const userToReturn = { ...newUser.toJSON(), token };
    delete userToReturn.Password;
    return res.status(200).json({ success: true, user: userToReturn });
  } catch (err) {
    if (err instanceof mongoose.mongo.MongoError) {
      return res.status(406).json({
        success: false,
        error: "a user with this email is already exists.",
      });
    }
  }
  return res
    .status(500)
    .json({ success: false, error: "Internal server error" });
});

router.post("/login", async (req, res) => {
  // email and password from user in req.body

  const { email, password } = req.body;

  //check if a user with given email is already exists , if not credentials are invalid

  const user = await User.findOne({ email: email });
  if (!user) {
    return res.status(403).json({ success: false, err: "Invalid credentials" });
  }

  //if user exists check the password is correct , if not then credentials are invalid

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return res.status(403).json({ success: false, err: "Invalid credentials" });
  }

  // if credentials are valid then, return token to user

  const token = await getToken(user.email, user);
  const userToReturn = { ...user.toJSON(), token };
  delete userToReturn.Password;
  return res.status(200).json({ success: true, user: userToReturn });
});

module.exports = router;
