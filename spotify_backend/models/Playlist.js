// npm i mongoose :: mongoose package install kiya to connect it to mongodb.

// how to create a model
// Step 1 : require mongoose
// step 2 : Create a mongoose schema (Structure  of a user)
// step 3: create a model

// Step 1 ::
const mongoose = require("mongoose");

// Step 2 ::

const Playlist = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  thumnail: {
    type: String,
    required: true,
  },

  owner: {
    type: mongoose.Types.ObjectId,
    ref: "user",
  },

  //Playlsit mein song konse hai.
  //Playlist main collabrators kon hai.

  Songs: [
    {
      types: mongoose.Types.ObjectId,
      ref: "song",
    },
  ],

  collabrator: [
    {
      type: mongoose.Types.ObjectId,
      ref: "user",
    },
  ],
});

// Step 3 ::

const PlaylistModel = mongoose.model("Playlist", Playlist); // first argument is name, second argument is schema.

module.exports = PlaylistModel;
