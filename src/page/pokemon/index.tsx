"use client";

import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
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
    <Container>
      <CardContainer>
        <PokemonDetails
          pokemonId={id}
          pokemonName={pokemonName}
          sprites={sprites}
          types={types}
        />
      </CardContainer>

      <CardContainer>
        <PokemonStats stats={stats} />
      </CardContainer>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;

  @media (min-width: 600px) {
    flex-direction: row;
  }
`;

const CardContainer = styled(StyledCardContainer)`
  width: 100%;

  @media (min-width: 600px) {
    width: 50%;
  }
`;
