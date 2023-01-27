import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./components/Home.js";
import Food from "./components/Food.js";
import FoodEdit from "./components/FoodEdit.js";
import Games from "./components/Games.js";
import GamesEdit from "./components/GamesEdit.js";
import Music from "./components/Music.js";
import MusicEdit from "./components/MusicEdit.js";
import Navbar from "./components/Navbar.js";
import Account from "./components/Account.js";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/food" element={<Food />} />
        <Route path="/food/:id/edit" element={<FoodEdit />} />
        <Route path="/games" element={<Games />} />
        <Route path="/games/:id/edit" element={<GamesEdit />} />
        <Route path="/music" element={<Music />} />
        <Route path="/music/:id/edit" element={<MusicEdit />} />
        <Route path="/login" element={<Account />} />
      </Routes>
    </div>
  );
}

export default App;
