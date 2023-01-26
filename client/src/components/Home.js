import React from "react";
import { useStore } from "../context/StoreProvider";

export default function Home() {
  const { food } = useStore();

  const todayFood =
    food !== null && food[Math.floor(Math.random() * food.length)];

  return (
    <div>
      <h1>Your combo for today:</h1>
      <div>Food: {todayFood.name}</div>
    </div>
  );
}
