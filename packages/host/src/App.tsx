import React, { useState } from "react";
import { Provider } from "react-redux";
import { PokemonDetail } from "./components/PokemonDetail";
import { store } from "./store";

const App = (): JSX.Element => {
  return (
    <Provider store={store}>
      Hi there
      <PokemonDetail pokemonName="bulbasaur" />
    </Provider>
  );
};

export default App;
