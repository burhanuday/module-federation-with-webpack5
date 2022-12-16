import React from "react";
import { useGetSpeciesByNameQuery } from "../services/speciesService";

export const SpeciesDetail = ({ speciesName }: { speciesName: string }) => {
  const { isLoading, error, data } = useGetSpeciesByNameQuery(speciesName);

  if (isLoading) return <p>Loading data for {speciesName}</p>;

  if (error) return <p>Error loading data for {speciesName}</p>;

  if (data) {
    return (
      <div
        style={{
          border: "1px solid green",
        }}
      >
        <h3>Name: {data.name}</h3>
        <p>id: {data.id}</p>
      </div>
    );
  }
};
