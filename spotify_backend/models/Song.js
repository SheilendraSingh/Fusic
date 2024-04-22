// npm i mongoose :: mongoose package install kiya to connect it to mongodb.

// how to create a model
// Step 1 : require mongoose
// step 2 : Create a mongoose schema (Structure  of a user)
// step 3: create a model

// Step 1 ::
const mongoose = require("mongoose");

// Step 2 ::

const Song = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  thumnail: {
    type: String,
    required: true,
  },
  track: {
    type: String,
    required: true,
  },
  artist: {
    type: mongoose.Types.ObjectId,
    ref: "user",
  },
});

// Step 3 ::

const SongModel = mongoose.model("Song", Song); // first argument is name, second argument is schema.

module.exports = SongModel;
