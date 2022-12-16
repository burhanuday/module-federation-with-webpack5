import { createSlice } from "@reduxjs/toolkit";

type RemoteState = {
  counter: number;
};

const initialState: RemoteState = {
  counter: 0,
};

export const remoteSlice = createSlice({
  name: "remote",
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

export const { increment, decrement } = remoteSlice.actions;
