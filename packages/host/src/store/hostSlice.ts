import { createSlice } from "@reduxjs/toolkit";

type HostState = {
  counter: number;
};

const initialState: HostState = {
  counter: 0,
};

export const hostSlice = createSlice({
  name: "host",
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

export const { increment, decrement } = hostSlice.actions;
