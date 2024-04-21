import styled from "styled-components";

import { Flex } from "@/styles";
import { EPokemonTypes } from "@/types/enums";

import PokemonImage from "@/components/pokemon-image";
import PokemonTypeCard from "@/components/pokemon-type-card";

type TSpritesDatatype = {
  front_default: string;
  other: {
    dream_world: { front_default: string };
    "official-artwork": { front_default: string };
  };
};

type TTypesDatatype = {
  type: { name: string };
};

type IProps = {
  pokemonId: number;
  pokemonName: string;
  sprites: TSpritesDatatype;
  types: TTypesDatatype[];
};

export default function PokemonDetails({
  pokemonId,
  pokemonName,
  sprites,
  types,
}: IProps) {
  return (
    <Flex direction="column" justify="center" align="center" gap="16px">
      <PokemonImage
        pokemonId={pokemonId}
        alternateImageSrc={
          sprites.front_default ||
          sprites.other?.dream_world?.front_default ||
          sprites.other?.["official-artwork"]?.front_default
        }
        width={200}
        height={200}
      />

      <PokemonId>{pokemonId}</PokemonId>

      <PokemonName>{pokemonName}</PokemonName>

      <Flex gap="8px">
        {types.map((type) => {
          const pokemonType = type.type.name;
          if (
            [EPokemonTypes.unknown, EPokemonTypes.shadow].includes(
              pokemonType as any
            )
          ) {
            return null;
          }

          return (
            <PokemonTypeCard
              key={pokemonType}
              pokemonType={pokemonType as keyof typeof EPokemonTypes}
              iconSize={{ width: 24, height: 24 }}
              showLabel={false}
            />
          );
        })}
      </Flex>
    </Flex>
  );
}

const PokemonId = styled.div`
  background-color: aliceblue;
  padding: 4px 8px;
  border-radius: 4px;

  &::before {
    content: "#";
  }
`;

const PokemonName = styled.h3`
  text-transform: uppercase;
`;
