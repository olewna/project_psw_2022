import React from "react";
import { useStore } from "../context/StoreProvider";

export default function Home() {
  const { food, music, games, loading } = useStore();

  const todayFood = !loading && food[Math.floor(Math.random() * food.length)];

  const todayMusic =
    !loading && music[Math.floor(Math.random() * music.length)];

  const todayGames =
    !loading && games[Math.floor(Math.random() * games.length)];

  return (
    <div className="d-flex flex-column justify-content-center align-items-center">
      <h1>Your combo for today:</h1>
      <div>Food: {todayFood.name}</div>
      <div>Playlist: {todayMusic.name}</div>
      <div>Games: {todayGames.name}</div>
    </div>
  );
}
