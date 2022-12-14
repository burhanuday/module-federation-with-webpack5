import { pokemonApi } from "../store/apiSlice";

export const pokemonService = pokemonApi.injectEndpoints({
  endpoints: (builder) => ({
    getPokemonByName: builder.query({
      query: (name) => `pokemon/${name}`,
      providesTags: (result, error, name) => [{ type: "pokemon", name }],
    }),
  }),
});

export const { useGetPokemonByNameQuery } = pokemonService;
