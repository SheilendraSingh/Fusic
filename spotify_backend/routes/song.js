const express = require("express");
const router = express.Router();
const passport = require("passport");
const Song = require("../models/Song");
const User = require("../models/User");

router.post(
  "/create",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    //req.user gets the user because of passport.authenicaticate
    const { name, thumbnail, track } = req.body;
    if (!name || !thumbnail || !track) {
      return res
        .status(301)
        .josn({ success: false, err: "Insufficient details to create songs" });
    }
    const artist = req.user._id;
    const songDetails = { name, thumbnail, track, artist };
    const createdsong = await Song.create(songDetails);
    return res.status(200).json(createdsong);
  }
);

//get route to all songs that i have published

router.get(
  "/get/mysongs",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      // when aartist id = current id , fetch all songs
      const songs = await Song.find({ artist: req.user._id });
      return req.status(200).json({ success: true, data: songs });
    } catch (error) {
      return res
        .status(500)
        .json({ success: false, error: "Failed to fetch songs." });
    }
  }
);

// Get route to get all the song that any artist has published.

//I will send the artish id and i qant to see all the song that artish has published.

router.get(
  "/get/artist/:artist",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      const { artistId } = req.params;
      //artist h ya nhi h

      const artist = await User.findOne({ _id: artistId });
      if (!artist) {
        return res
          .status(301)
          .json({ success: false, err: "Artist does not exist." });
      }

      const songs = await Song.find({ artist: artistId });
      return res.status(200).json({ success: true, data: songs });
    } catch (error) {
      console.error("Error fetching Artist:", error);
      return res
        .status(500)
        .json({ success: false, error: "Failed to fetch Artist." });
    }
  }
);

//Get route to get single song by name
router.get(
  "/get/songname/:songname",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      const { songName } = req.params;
      const songs = await Song.find({ name: songName });
      return res.status(200).json({ success: true, data: songs });
    } catch (error) {
      console.error("Error fetching songs:", error);
      return res
        .status(500)
        .json({ success: false, error: "Failed to fetch songs." });
    }
  }
);

module.exports = router;
