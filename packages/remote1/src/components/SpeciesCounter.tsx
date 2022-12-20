import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { increment } from "../remoteSlice";

export function SpeciesCounter() {
  const speciesCount = useSelector((state) => state.remote.counter);
  const hostCounter = useSelector((state) => state.host.counter);
  const otherAppCounter = useSelector((state) => state.otherApp.counter);
  const dispatch = useDispatch();
  return (
    <div>
      <p>SpeciesCounter</p>
      <p>Number of species: {speciesCount}</p>
      <button onClick={() => dispatch(increment())}>increment</button>
    </div>
  );
}
