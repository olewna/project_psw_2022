import React, { useContext, useState, useEffect } from "react";
import axios from "axios";

const StoreContext = React.createContext();

export function useStore() {
  return useContext(StoreContext);
}

export function StoreProvider({ children }) {
  //login
  const [loading, setLoading] = useState(true);
  const [food, setFood] = useState(null);
  const [comments, setComments] = useState(null);
  const [music, setMusic] = useState(null);
  const [games, setGames] = useState(null);
  const [users, setUsers] = useState(null);
  const [logged, setLogged] = useState({
    nickname: "",
    type: "",
  });

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
    <StoreContext.Provider
      value={{
        food,
        setFood,
        comments,
        setComments,
        music,
        setMusic,
        games,
        setGames,
        users,
        setUsers,
        logged,
        setLogged,
        loading,
        setLoading,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
}
