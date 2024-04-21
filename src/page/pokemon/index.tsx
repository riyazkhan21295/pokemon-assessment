"use client";

import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import styled from "styled-components";

import { Flex } from "@/styles";

import Empty from "@/components/empty";
import PokemonStats from "@/components/pokemon-stats";

import { fetchPokemon } from "@/services/api-services";

type TSpritesDatatype = {
  front_default: string;
  other: {
    dream_world: { front_default: string };
    "official-artwork": { front_default: string };
  };
};

type TStatsDatatype = {
  base_stat: number;
  stat: { name: string };
};

type TTypesDatatype = {
  type: { name: string };
};

type TDatatype = {
  sprites: TSpritesDatatype;
  stats: TStatsDatatype[];
  types: TTypesDatatype[];
};

export default function PokemonPage() {
  const params = useParams();
  const pokemonName = params.name as string;

  const { isLoading, isError, data } = useQuery<TDatatype>({
    queryKey: ["pokemon", pokemonName],
    queryFn: () => fetchPokemon(pokemonName),
  });

  if (isLoading) return <p>loading...</p>;

  if (isError) return <p>Error...</p>;

  if (!data) {
    return (
      <Flex>
        <Empty text="No Data" />
      </Flex>
    );
  }

  const { sprites, stats, types } = data;

  return (
    <Container>
      <Flex>Pokemon Details</Flex>

      <PokemonStatsContainer>
        <PokemonStats stats={stats} />
      </PokemonStatsContainer>
    </Container>
  );
}

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
`;

const PokemonStatsContainer = styled.div`
  background-color: #fff;
  border-radius: 4px;
  padding: 16px;
`;
