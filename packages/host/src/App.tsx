import React, { Suspense } from "react";
import { Provider } from "react-redux";
import { PokemonDetail } from "./components/PokemonDetail";
import { store } from "./store";
import { SpeciesDetail } from "remote1/SpeciesDetail";
import { SpeciesCounter } from "remote1/SpeciesCounter";

const App = (): JSX.Element => {
  return (
    <Provider store={store}>
      <SpeciesCounter />
      <PokemonDetail pokemonName="bulbasaur" />
      <PokemonDetail pokemonName="ditto" />
      <PokemonDetail pokemonName="venusaur" />
      <PokemonDetail pokemonName="charmander" />
      <SpeciesDetail speciesName="aegislash" />
    </Provider>
  );
};

export default App;
