import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Library from "./Library";
import Feed from "./Feed";
import Player from "./Player";
import Favourites from "./Favourites";
import Trending from "./Trending";

export default function Home() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/feed" element={<Feed />} />
        <Route path="/library" element={<Library />} />
        <Route path="/player" element={<Player />} />
        <Route path="/favourites" element={<Favourites />} />
        <Route path="/trending" element={<Trending />} />
      </Routes>
    </Router>
  );
}
