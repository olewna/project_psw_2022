import React, { useEffect, useState } from "react";
import { useStore } from "./context/StoreProvider.js";
import { Routes, Route } from "react-router-dom";
import Home from "./components/Home.js";
import Food from "./components/Food.js";
import Navbar from "./components/Navbar.js";
import axios from "axios";

function App() {
  const { setComments, setFood } = useStore();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const p1 = axios.get("/api/comments");
    const p2 = axios.get("/api/food");

    Promise.all([p1, p2])
      .then((val) => {
        setComments(val[0].data);
        setFood(val[1].data);
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
      </Routes>
    </div>
  );
}

export default App;
