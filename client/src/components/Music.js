import React from "react";
import { useStore } from "../context/StoreProvider";

export default function Food() {
  const { music } = useStore();
  const musicList =
    music !== null ? (
      music.map((m) => (
        <div key={m.id}>
          {m.name} by {m.author}. Length: {m.length}. Type : {m.type}.
        </div>
      ))
    ) : (
      <div>Loading...</div>
    );
  return (
    <div>
      <h2>Music:</h2>
      {musicList}
    </div>
  );
}
