const express = require("express");
const router = express.Router();
const passport = require("passport");
const Playlist = require("../models/Playlist");
const Song = require("../models/Song");

router.post(
  "/create",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      const currentUser = req.user;
      const { name, thumnail, songs } = req.body;
      if (!name || !thumnail || !songs) {
        return res
          .status(301)
          .json({ success: false, error: "Insufficient Data" });
      }

      const playlistData = {
        name,
        thumnail,
        songs,
        owner: currentUser._id,
        collabrator: {},
      };

      const playlist = await Playlist.create(playlistData);
      return res.status(200).json({ success: true, data: playlist });
    } catch (error) {
      return res
        .status(500)
        .json({ success: false, error: "Failed to Create Plpaylist." });
    }
  }
);

router.get(
  "/get/playlist/:playlistId",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      const playlistId = req.params.playlistId;
      const playlist = await Playlist.findOne({ _id: playlistId });
      if (!playlist) {
        return res.status(301).json({ success: false, error: "Invalid Id" });
      }
      return res.status(200).json({ success: true, data: playlist });
    } catch (error) {
      return res
        .status(500)
        .json({ success: false, error: "Failed to fetch Plpaylist." });
    }
  }
);

router.post(
  "/add/song",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const currentUser = req.user;
    const { playlistId, songId } = req.body;

    const playlist = await Playlist.findOne({ _id: playlistId });
    if (!playlist) {
      return res
        .status(304)
        .json({ success: false, err: "playlist does not exist" });
    }
    if (
      !playlist.owner.equals(currentUser._id) &&
      !playlist.collabrators.includes(currentUser._id)
    ) {
      return res.status(400).json({ success: false, err: "Not allowed" });
    }

    const song = await Song.findOne({ _id: songId });

    if (!song) {
      return res
        .status(304)
        .json({ success: false, error: "Song does not exist" });
    }

    playlist.song.push(songId);
    await playlist.save;
    return res.status(200).json({ success: true, data: playlist });
  }
);

router.get(
  "/get/me",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const artistId = req.user._id;

    const playlists = await Playlist.find({ owner: artistId }).populate(
      "owner"
    );
    return res.status(200).json({ data: playlists });
  }
);

// Get all playlists made by an artist
// /get/artist/xyz
router.get(
  "/get/artist/:artistId",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const artistId = req.params.artistId;

    // We can do this: Check if artist with given artist Id exists
    const artist = await User.findOne({ _id: artistId });
    if (!artist) {
      return res.status(304).json({ err: "Invalid Artist ID" });
    }

    const playlists = await Playlist.find({ owner: artistId });
    return res.status(200).json({ data: playlists });
  }
);

module.exports = router;
