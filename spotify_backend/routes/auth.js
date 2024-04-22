const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const { getToken } = require("../utils/helper");

//this post route user register krega
router.post("/register", async (req, res) => {
  // /register as a post request call hone pr hi yha ka code chlega
  //req. bosy {email, password, firstName, LastName, UserName}
  const { email, password, fistName, lastName, username } = req.body;

  // check the user with the email already exist? If yes, we throe an err.
  const user = await User.findOne({ email: email });
  if (user) {
    return res
      .status(403)
      .json({ error: "A user with this email is already exist." });
  }

  //if doest not exist then it's a valid request

  // Create a new User
  // for seurity we gonna hash our password

  const hashedPassword = bcrypt.hash(password, 10);
  const newUserData = {
    email,
    password: hashedPassword,
    fistName,
    lastName,
    username,
  };
  const newUser = await User.create(newUserData);

  // need to create token to return to the user

  const token = getToken(email, newUser);
});
