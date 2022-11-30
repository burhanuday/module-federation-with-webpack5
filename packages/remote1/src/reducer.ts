import { some, logMe } from "host/data";

export const ACTION_INCREMENT = "INCREMENT";
export const ACTION_DECREMENT = "DECREMENT";

export type Action = typeof ACTION_INCREMENT | typeof ACTION_DECREMENT;

export type State = number;

const counterReducer = (state: State = 0, { type }: { type: Action }) => {
  console.log("some", some);
  logMe();
  if (type === "INCREMENT") {
    return state + 10;
  } else if (type === "DECREMENT") {
    return state - 1;
  } else {
    return state;
  }
};

export default counterReducer;
