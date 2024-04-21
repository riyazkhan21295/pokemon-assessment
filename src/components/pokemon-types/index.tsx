import { useQuery } from "@tanstack/react-query";

import { fetchPokemonTypes } from "@/services/api-services";
import { EPokemonTypes, EPokemonTypesColors } from "@/types/enums";

import CardCheckbox from "@/components/card-checkbox";
import styled from "styled-components";
import { Flex } from "@/styles";

type TPokemonTypes = `${EPokemonTypes}`;

type TResultDatatype = {
  name: TPokemonTypes;
  url: string;
};

type TDatatype = {
  // count: number;
  // next: boolean | null;
  // previous: boolean | null;
  results: TResultDatatype[];
};

type IProps = {
  onSelect: (items: any[]) => void;
};

export default function PokemonTypes({ onSelect }: IProps) {
  const { isLoading, isError, data } = useQuery<TDatatype>({
    queryKey: ["pokemon-types"],
    queryFn: fetchPokemonTypes,
  });

  if (isLoading) return <p>Loading...</p>;

  if (isError) return <p>Error</p>;

  const filteredResults = (data?.results || []).filter((pokemonType) => {
    return ![EPokemonTypes.unknown, EPokemonTypes.shadow].includes(
      pokemonType.name as any
    );
  });

  const icons = filteredResults.reduce((acc, cv) => {
    return {
      ...acc,
      [cv.name]: {
        imageSrc: require(`@/assets/pokemon-types/${cv.name}.png`),
        styles: {
          backgroundColor: EPokemonTypesColors[cv.name],
        },
      },
    };
  }, {});

  return (
    <Container direction="column" gap="8px" align="center">
      <PokemonType>Pokemon Types</PokemonType>

      <CardCheckbox
        selectable
        multiple
        items={filteredResults.map((item) => ({
          ...item,
          styles: {
            backgroundColor: EPokemonTypesColors[item.name],
          },
        }))}
        labelKey="name"
        valueKey="name"
        onSelect={onSelect}
        styles={{
          container: { justifyContent: "center" },
          itemContainer: { minWidth: 100 },
        }}
        icons={icons}
      />
    </Container>
  );
}

const Container = styled(Flex)``;

const PokemonType = styled.h4`
  text-transform: uppercase;
`;
