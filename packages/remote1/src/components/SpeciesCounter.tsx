import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { increment } from "../remoteSlice";

export function SpeciesCounter() {
  const speciesCount = useSelector((state) => state.remote.counter);
  const hostCounter = useSelector((state) => state.host.counter);
  const otherAppCounter = useSelector((state) => state.otherApp);
  const otherAppCounter1 = useSelector((state) => state.otherApp.counter);
  const otherAppCounter2 = useSelector((state) => state.otherApp.counter.data);
  const otherAppCounter6 = useSelector(({ otherApp }) => otherApp);
  const otherAppCounter7 = useSelector(({ otherApp }) => otherApp.data);
  const otherAppCounter8 = useSelector(({ otherApp }) => otherApp.data.data);
  const otherAppCounter9 = useSelector(
    ({ otherApp: { asd }, something }) => otherApp.data.data
  );
  const otherAppCounter10 = useSelector(
    ({ otherApp: abc, something }) => otherApp.data.data
  );
  const otherAppCounter4 = useSelector(function (state) {
    return state.otherApp;
  });
  const otherAppCounter3 = useSelector(function (state) {
    return state.otherApp.counter;
  });

  const otherAppCounter5 = useSelector(function (state) {
    return state.otherApp.counter.data;
  });

  const otherAppCounter11 = useSelector(function ({ host, otherApp }) {
    return otherApp.counter.data;
  });
  const dispatch = useDispatch();
  return (
    <div>
      <p>SpeciesCounter</p>
      {/* <p>Number of species: {otherAppCounter2}</p> */}
      <button onClick={() => dispatch(increment())}>increment</button>
    </div>
  );
}
