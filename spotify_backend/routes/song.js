const express = require("express");
const router = express.Router();
const passport = require("passport");
const Song = require("../models/Song");

router.post(
  "/create",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    //req.user gets the user because of passport.authenicaticate
    const { name, thumbnail, track } = req.body;
    if (!name || !thumbnail || !track) {
      return res
        .status(301)
        .josn({ err: "Insufficient details to create songs" });
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
    // when aartist id = current id , fetch all songs
    const songs = await Song.find({ artist: req.user._id });
    return req.status(200).json({ data: songs });
  }
);

module.exports = router;
