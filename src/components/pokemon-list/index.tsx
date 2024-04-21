import { useQuery } from "@tanstack/react-query";
import styled from "styled-components";
import { useRouter } from "next/navigation";

import { CardContainer, Flex } from "@/styles";

import { fetchPokemonList } from "@/services/api-services";
import PokemonCard from "@/components/pokemon-card";
import PokemonTypeCard from "@/components/pokemon-type-card";
import { EPokemonTypes } from "@/types/enums";

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
  const router = useRouter();

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

  const handleOnClick = (pokemonName: string) => {
    router.push(`/pokemon/${pokemonName}`);
  };

  if (filteredPokemonList.length === 0) {
    return null;
  }

  return (
    <Container direction="column" gap="16px">
      <PokemonTypeCardContainer justify="center">
        <PokemonTypeCard
          pokemonType={pokemonType as keyof typeof EPokemonTypes}
          iconSize={{ width: 32, height: 32 }}
          styles={{ container: { backgroundColor: "#fff" } }}
        />
      </PokemonTypeCardContainer>

      <PokemonListContainer wrap="wrap" gap="16px" justify="center">
        {filteredPokemonList.map((pokemonItem) => {
          const pokemonId = pokemonItem.pokemon.url
            .split("/")
            .filter((_) => _)
            .pop();
          const pokemonName = pokemonItem.pokemon.name;

          return (
            <PokemonCardContainer
              key={pokemonId}
              onClick={() => handleOnClick(pokemonName)}
            >
              <PokemonCard
                pokemonType={pokemonType}
                pokemonId={pokemonId!}
                pokemonName={pokemonName}
              />
            </PokemonCardContainer>
          );
        })}
      </PokemonListContainer>
    </Container>
  );
}

const Container = styled(Flex)``;

const PokemonTypeCardContainer = styled(Flex)``;

const PokemonListContainer = styled(Flex)`
  padding: 16px;
`;

const PokemonCardContainer = styled(CardContainer)`
  padding: 0;
  width: 100%;

  @media (min-width: 600px) {
    width: 200px;
  }
`;
