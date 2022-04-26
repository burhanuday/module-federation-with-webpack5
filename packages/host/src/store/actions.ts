import { ACTION_DECREMENT, ACTION_INCREMENT } from "./reducer";

export const increment = () => {
  return {
    type: ACTION_INCREMENT,
  };
};

export const decrement = () => {
  return {
    type: ACTION_DECREMENT,
  };
};
