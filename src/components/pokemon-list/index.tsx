import { useQuery } from "@tanstack/react-query";
import styled from "styled-components";
import { useRouter } from "next/navigation";

import { Flex } from "@/styles";

import { fetchPokemonList } from "@/services/api-services";
import PokemonCard from "@/components/pokemon-card";

type IProps = {
  pokemonType: string;
  apiUrl: string;
  searchedPokemonName?: string | undefined;
  renderTitle?: any;
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
  renderTitle,
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

  if (filteredPokemonList.length === 0) {
    return null;
  }

  return (
    <Flex direction="column" gap="16px">
      <Flex>{renderTitle}</Flex>

      <Container>
        {filteredPokemonList.map((pokemonItem) => {
          const pokemonId = pokemonItem.pokemon.url
            .split("/")
            .filter((_) => _)
            .pop();

          return (
            <div
              key={pokemonId}
              onClick={() =>
                router.push(`/pokemon/${pokemonItem.pokemon.name}`)
              }
            >
              <PokemonCard
                pokemonType={pokemonType}
                pokemonId={pokemonId!}
                pokemonName={pokemonItem.pokemon.name}
              />
            </div>
          );
        })}
      </Container>
    </Flex>
  );
}

const Container = styled.div`
  width: 100%;

  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 16px;
`;
