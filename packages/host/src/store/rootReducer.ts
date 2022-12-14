import { combineReducers } from "redux";
import { pokemonApi } from "./apiSlice";

export const rootReducer = combineReducers({
  [pokemonApi.reducerPath]: pokemonApi.reducer,
});
