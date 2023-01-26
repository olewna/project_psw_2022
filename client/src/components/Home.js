import React from "react";
import { useStore } from "../context/StoreProvider";

export default function Home() {
  const { food, music, games } = useStore();

  const todayFood =
    food !== null && food[Math.floor(Math.random() * food.length)];

  const todayMusic =
    music !== null && music[Math.floor(Math.random() * music.length)];

  const todayGames =
    games !== null && games[Math.floor(Math.random() * games.length)];

  return (
    <div>
      <h1>Your combo for today:</h1>
      <div>Food: {todayFood.name}</div>
      <div>Playlist: {todayMusic.name}</div>
      <div>Games: {todayGames.name}</div>
    </div>
  );
}
