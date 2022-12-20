import { combineReducers } from "redux";
import { pokemonApi } from "./apiSlice";
import { hostSlice } from "./hostSlice";
import { remoteSlice } from "remote1/remoteSlice";
import { otherAppSlice } from "./otherAppSlice";

export const rootReducer = combineReducers({
  [pokemonApi.reducerPath]: pokemonApi.reducer,
  [hostSlice.name]: hostSlice.reducer,
  [remoteSlice.name]: remoteSlice.reducer,
  [otherAppSlice.name]: otherAppSlice.reducer,
});
