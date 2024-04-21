import styled from "styled-components";
import { useQuery } from "@tanstack/react-query";

import { fetchPokemonTypes } from "@/services/api-services";
import { EPokemonTypes, EPokemonTypesColors } from "@/types/enums";

import PokemonTypeCard from "@/components/pokemon-type-card";

import { Flex } from "@/styles";

import useCheckbox from "@/hooks/useCheckbox";
import { useEffect } from "react";

type TPokemonTypes = `${EPokemonTypes}`;

type TResultDatatype = {
  name: TPokemonTypes;
  url: string;
};

type TDatatype = {
  results: TResultDatatype[];
};

type IProps = {
  onSelect: (items: any[]) => void;
};

export default function PokemonTypes({ onSelect: onSelectCallback }: IProps) {
  const { isLoading, isError, data } = useQuery<TDatatype>({
    queryKey: ["pokemon-types"],
    queryFn: fetchPokemonTypes,
  });

  const { selectedItems, onSelect } = useCheckbox({ multiple: true });

  useEffect(() => {
    const newSelectedItems = (data?.results || []).filter((item) => {
      return selectedItems.includes(item.name);
    });

    onSelectCallback?.(newSelectedItems);
  }, [selectedItems]);

  if (isLoading) return <p>Loading...</p>;

  if (isError) return <p>Error</p>;

  const filteredResults = (data?.results || []).filter((pokemonType) => {
    return ![EPokemonTypes.unknown, EPokemonTypes.shadow].includes(
      pokemonType.name as any
    );
  });

  return (
    <Container direction="column" gap="8px" align="center">
      <PokemonType>Pokemon Types</PokemonType>

      <PokemonTypeListContainer gap="8px" wrap="wrap" justify="center">
        {filteredResults.map((item) => {
          const isSelected = selectedItems.includes(item.name);

          return (
            <PokemonTypeCardContainer
              key={item.name}
              $pokemonType={item.name}
              $isSelected={isSelected}
              onClick={() => onSelect(item.name)}
            >
              <PokemonTypeCard
                pokemonType={item.name}
                iconSize={{ width: 24, height: 24 }}
              />
            </PokemonTypeCardContainer>
          );
        })}
      </PokemonTypeListContainer>
    </Container>
  );
}

const Container = styled(Flex)``;

const PokemonType = styled.h4`
  text-transform: capitalize;
`;

const PokemonTypeListContainer = styled(Flex)`
  padding: 4px;
`;

const PokemonTypeCardContainer = styled.div<{
  $pokemonType: string;
  $isSelected: boolean;
}>`
  cursor: pointer;

  ${(props) => {
    const color =
      EPokemonTypesColors[
        props.$pokemonType as keyof typeof EPokemonTypesColors
      ];

    return `
      border-radius: 4px;
      background-color: ${props.$isSelected ? color : "#fff"};
      
      &:hover {
        background-color: ${color};
        transition: all 0.5s;
      }
    `;
  }}
`;
