import React from "react";
import { useStore } from "../context/StoreProvider";

export default function Food() {
  const { food } = useStore();
  const foodList =
    food !== null &&
    food.map((f) => (
      <div key={f.id}>
        {f.name} from {f.company}. Call {f.telephone}.
      </div>
    ));
  return (
    <div>
      <h2>Food:</h2>
      {foodList}
    </div>
  );
}
