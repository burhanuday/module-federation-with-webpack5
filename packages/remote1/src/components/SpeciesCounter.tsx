import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { increment } from "../remoteSlice";

export function SpeciesCounter() {
  const dispatch = useDispatch();
  return (
    <div>
      <p>SpeciesCounter</p>
      {/* <p>Number of species: {otherAppCounter2}</p> */}
      <button onClick={() => dispatch(increment())}>increment</button>
    </div>
  );
}
