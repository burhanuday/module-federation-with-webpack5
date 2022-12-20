import { createSlice } from "@reduxjs/toolkit";

type OtherAppState = {
  counter: number;
};

const initialState: OtherAppState = {
  counter: 0,
};

export const otherAppSlice = createSlice({
  name: "otherApp",
  initialState,
  reducers: {
    increment: (state) => {
      state.counter = state.counter + 1;
    },
    decrement: (state) => {
      state.counter = state.counter - 1;
    },
  },
});

export const { increment, decrement } = otherAppSlice.actions;
