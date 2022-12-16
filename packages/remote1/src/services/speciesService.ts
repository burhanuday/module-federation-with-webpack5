import { pokemonApi } from "host/apiSlice";

export const speciesService = pokemonApi.injectEndpoints({
  endpoints: (builder) => ({
    getSpeciesByName: builder.query({
      query: (name) => `pokemon-species/${name}`,
      providesTags: (result, error, name) => [
        { type: "pokemon-species", name },
      ],
    }),
  }),
});

export const { useGetSpeciesByNameQuery } = speciesService;
