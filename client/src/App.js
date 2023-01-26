import React, { useEffect, useState } from "react";
import { useStore } from "./context/StoreProvider.js";
import { Routes, Route } from "react-router-dom";
import Home from "./components/Home.js";
import Food from "./components/Food.js";
import Music from "./components/Music.js";
import Navbar from "./components/Navbar.js";
import axios from "axios";

function App() {
  const { setComments, setFood, setMusic } = useStore();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const p1 = axios.get("/api/comments");
    const p2 = axios.get("/api/food");
    const p3 = axios.get("/api/music");

    Promise.all([p1, p2, p3])
      .then((val) => {
        setComments(val[0].data);
        setFood(val[1].data);
        setMusic(val[2].data);
        setLoading(false);
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/food" element={<Food />} />
        <Route path="/music" element={<Music />} />
      </Routes>
    </div>
  );
}

export default App;
