import React, { useContext, useState } from "react";

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
