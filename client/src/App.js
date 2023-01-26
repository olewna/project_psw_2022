import React, { useEffect } from "react";
import { useStore } from "./context/StoreProvider.js";
import { Routes, Route } from "react-router-dom";
import Home from "./components/Home.js";
import Food from "./components/Food.js";
import FoodEdit from "./components/FoodEdit.js";
import Music from "./components/Music.js";
import Games from "./components/Games.js";
import Navbar from "./components/Navbar.js";
import Account from "./components/Account.js";
import axios from "axios";

function App() {
  const { setComments, setFood, setMusic, setGames, setUsers, setLoading } =
    useStore();

  useEffect(() => {
    setLoading(true);
    const p1 = axios.get("/api/comments");
    const p2 = axios.get("/api/food");
    const p3 = axios.get("/api/music");
    const p4 = axios.get("/api/games");
    const p5 = axios.get("/api/users");

    Promise.all([p1, p2, p3, p4, p5])
      .then((val) => {
        setComments(val[0].data);
        setFood(val[1].data);
        setMusic(val[2].data);
        setGames(val[3].data);
        setUsers(val[4].data);
      })
      .then((res) => setLoading(false))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/food" element={<Food />} />
        <Route path="/food/:id/edit" element={<FoodEdit />} />
        <Route path="/music" element={<Music />} />
        <Route path="/games" element={<Games />} />
        <Route path="/login" element={<Account />} />
      </Routes>
    </div>
  );
}

export default App;
