import React from "react";
import { useSelector } from "react-redux";
import { State } from "./store/reducer";

export default function Counter() {
  const state = useSelector((state: State) => state);

  return <div>Redux Counter: {state}</div>;
}
