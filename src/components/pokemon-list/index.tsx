import { useQuery } from "@tanstack/react-query";
import styled from "styled-components";

import { Flex } from "@/styles";

import { fetchPokemonList } from "@/services/api-services";
import PokemonCard from "@/components/pokemon-card";

type IProps = {
  pokemonType: string;
  apiUrl: string;
  searchedPokemonName?: string | undefined;
};

type TDatatype = {
  pokemon: {
    pokemon: {
      name: string;
      url: string;
    };
  }[];
};

export default function PokemonList({
  apiUrl,
  pokemonType,
  searchedPokemonName,
}: IProps) {
  const { isLoading, isError, data } = useQuery<TDatatype>({
    queryKey: ["pokemon-list", apiUrl],
    queryFn: () => fetchPokemonList(apiUrl),
  });

  if (isLoading) return <p>Loading...</p>;

  if (isError) return <p>Error</p>;

  let filteredPokemonList = data?.pokemon || [];
  if (searchedPokemonName) {
    filteredPokemonList = filteredPokemonList.filter((pokemonItem) => {
      const name = pokemonItem.pokemon.name.replaceAll("-", " ").toLowerCase();
      const searchedName = searchedPokemonName
        .replaceAll("-", " ")
        .toLowerCase();

      return name.includes(searchedName);
    });
  }

  return (
    <Container>
      {filteredPokemonList.map((pokemonItem) => {
        const pokemonId = pokemonItem.pokemon.url
          .split("/")
          .filter((_) => _)
          .pop();

        return (
          <PokemonCard
            key={pokemonId}
            pokemonType={pokemonType}
            pokemonId={pokemonId!}
            pokemonName={pokemonItem.pokemon.name}
          />
        );
      })}
    </Container>
  );
}

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 16px;
`;
