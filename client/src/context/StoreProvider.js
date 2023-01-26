import React, { useContext, useState } from "react";

const StoreContext = React.createContext();

export function useStore() {
  return useContext(StoreContext);
}

export function StoreProvider({ children }) {
  //login
  const [food, setFood] = useState(null);
  const [comments, setComments] = useState(null);
  const [music, setMusic] = useState(null);

  return (
    <StoreContext.Provider
      value={{
        food,
        setFood,
        comments,
        setComments,
        music,
        setMusic,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
}
