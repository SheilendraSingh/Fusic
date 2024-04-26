// npm i mongoose :: mongoose package install kiya to connect it to mongodb.

// how to create a model
// Step 1 : require mongoose
// step 2 : Create a mongoose schema (Structure  of a user)
// step 3: create a model

// Step 1 ::
const mongoose = require("mongoose");

// Step 2 ::

const User = new mongoose.Schema({
  FirstName: {
    type: String,
    required: true,
  },
  LastName: {
    type: String,
    required: false,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  username: {
    type: String,
    required: true,
  },
  likedSongs: {
    // We will change this to array later.
    type: String,
    default: "",
  },
  likedPlaylists: {
    //We will change thgis to array later.
    type: String,
    default: "",
  },
  subscribeArtist: {
    //We will change thgis to array later.
    type: String,
    default: "",
  },
});

// Step 3 ::

const UserModel = mongoose.model("User", User); // first argument is name, second argument is schema.

module.exports = UserModel;
