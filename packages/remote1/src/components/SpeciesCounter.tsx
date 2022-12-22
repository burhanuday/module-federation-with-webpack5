import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { increment } from "../remoteSlice";

type State = {
  remote: { counter: number };
  host: { counter: number };
  otherApp: {
    data: string;
    data2: string;
    data3: { data: string };
    counter: {
      data: string;
    };
  };
};

export function SpeciesCounter() {
  const speciesCount = useSelector((state: State) => state.remote.counter);
  const hostCounter = useSelector((state: State) => state.host.counter);
  const otherAppCounter = useSelector((state: State) => state.otherApp);
  const otherAppCounter1 = useSelector((state: State) => ({
    data: state.otherApp.counter,
  }));
  const otherAppCounter2 = useSelector(
    (state: State) => state.otherApp.counter.data
  );
  const otherAppCounter6 = useSelector(({ otherApp }: State) => otherApp);
  const otherAppCounter7 = useSelector(({ otherApp }: State) => otherApp.data);
  const otherAppCounter8 = useSelector(({ otherApp }: State) => ({
    data: otherApp.data3.data,
  }));
  const otherAppCounter9 = useSelector(
    ({ otherApp }: State) => otherApp.data3.data
  );

  const otherAppCounter4 = useSelector(function (state: State) {
    return state.otherApp;
  });
  const otherAppCounter3 = useSelector(function (state: State) {
    return state.otherApp.counter;
  });

  const otherAppCounter5 = useSelector(function (state: State) {
    return state.otherApp.counter.data;
  });

  const otherAppCounter11 = useSelector(function ({ host, otherApp }: State) {
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
