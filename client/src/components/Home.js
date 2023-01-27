import React from "react";
import { useStore } from "../context/StoreProvider";
import Comments from "./Comments";

export default function Home() {
  const { food, music, games, loading } = useStore();

  const todayFood = !loading && food[Math.floor(Math.random() * food.length)];

  const todayMusic =
    !loading && music[Math.floor(Math.random() * music.length)];

  const todayGames =
    !loading && games[Math.floor(Math.random() * games.length)];

  return (
    <div className="container">
      <div className="row">
        <div className="col-12 col-lg-7 d-flex flex-column pt-5 mt-5 align-items-center">
          <div className="h1 my-5 text-info">Your combo for today:</div>
          <div className="h1 text-warning">Food: {todayFood.name}</div>
          <div className="h1 text-success">Playlist: {todayMusic.name}</div>
          <div className="h1 text-danger">Game: {todayGames.name}</div>
        </div>
        <div className="col-12 col-lg-5">
          <h2 className="text-center">Comments:</h2>
          <Comments />
        </div>
      </div>
    </div>
  );
}
