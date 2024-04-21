"use client";

import { useQuery } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";
import styled from "styled-components";

import { CardContainer as StyledCardContainer, Flex } from "@/styles";

import Empty from "@/components/empty";
import PokemonStats from "@/components/pokemon-stats";

import { fetchPokemon } from "@/services/api-services";
import PokemonDetails from "@/components/pokemon-details";

type TDatatype = {
  id: number;
  sprites: any;
  stats: any[];
  types: any[];
};

export default function PokemonPage() {
  const router = useRouter();
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

  const { id, sprites, stats, types } = data;

  return (
    <CardContainer>
      <Flex justify="space-evenly" align="center">
        <PokemonDetails
          pokemonId={id}
          pokemonName={pokemonName}
          sprites={sprites}
          types={types}
        />

        <PokemonStats stats={stats} />
      </Flex>
    </CardContainer>
  );
}

const CardContainer = styled(StyledCardContainer)`
  /* min-height: 400px; */
`;
