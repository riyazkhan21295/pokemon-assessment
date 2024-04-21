import Image from "next/image";
import styled from "styled-components";

import { Flex } from "@/styles";
import { EPokemonTypes, EPokemonTypesColors } from "@/types/enums";

import PokemonImage from "../pokemon-image";

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
        {types.map((pokemonType) => {
          if (
            [EPokemonTypes.unknown, EPokemonTypes.shadow].includes(
              pokemonType.type.name as any
            )
          ) {
            return null;
          }

          return (
            <PokemonTypeIconContainer
              key={pokemonType.type.name}
              pokemonType={pokemonType.type.name}
              align="center"
              gap="8px"
            >
              <PokemonTypeName>{pokemonType.type.name}</PokemonTypeName>

              <Image
                loading="lazy"
                src={require(`@/assets/pokemon-types/${pokemonType.type.name}.png`)}
                width={25}
                height={25}
                alt={pokemonType.type.name}
              />
            </PokemonTypeIconContainer>
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

const PokemonTypeIconContainer = styled(Flex)<{ pokemonType: string }>`
  background-color: ${(props) =>
    EPokemonTypesColors[props.pokemonType as keyof typeof EPokemonTypesColors]};

  padding: 8px;
  border-radius: 4px;
`;

const PokemonTypeName = styled.span`
  text-transform: uppercase;
  font-size: 12px;
  letter-spacing: 1px;
`;
