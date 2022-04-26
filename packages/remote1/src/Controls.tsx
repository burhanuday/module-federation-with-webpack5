import React from "react";
import { useDispatch } from "react-redux";

import { increment, decrement } from "host/actions";

export default function Controls() {
  const dispatch = useDispatch();

  // const handleIncrement = () => {
  //   dispatch(increment());
  // };

  // const handleDecrement = () => {
  //   dispatch(decrement());
  // };

  return (
    <div>
      Controls
      <div>
        {/* <button onClick={handleIncrement}>increment</button>
        <button onClick={handleDecrement}>decrement</button> */}
      </div>
    </div>
  );
}
