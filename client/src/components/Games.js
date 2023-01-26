import React from "react";
import { useStore } from "../context/StoreProvider";

export default function Food() {
  const { games } = useStore();
  const gamesList =
    games !== null ? (
      games.map((g) => (
        <div key={g.id}>
          {g.name} for {g.price}. Type: {g.type}.
        </div>
      ))
    ) : (
      <div>Loading...</div>
    );
  return (
    <div>
      <h2>Games:</h2>
      {gamesList}
    </div>
  );
}
