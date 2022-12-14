import React from "react";
import { useGetPokemonByNameQuery } from "../services/pokemonService";

export const PokemonDetail = ({ pokemonName }: { pokemonName: string }) => {
  const { isLoading, error, data } = useGetPokemonByNameQuery(pokemonName);

  if (isLoading) return <p>Loading data for {pokemonName}</p>;

  if (error) return <p>Error loading data for {pokemonName}</p>;

  if (data) {
    return (
      <div
        style={{
          border: "1px solid red",
        }}
      >
        <h3>Name: {data.name}</h3>
        <p>id: {data.id}</p>
      </div>
    );
  }
};
