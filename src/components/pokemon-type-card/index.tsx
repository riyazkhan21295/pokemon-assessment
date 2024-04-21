import styled from "styled-components";
import Image from "next/image";

import { Flex } from "@/styles";

import { EPokemonTypesColors } from "@/types/enums";
import { CSSProperties } from "react";
import { TPokemonTypes } from "@/types/types";

type TProps = {
  pokemonType: TPokemonTypes;
  iconSize: { width: number; height: number };
  showLabel?: boolean;
  styles?: {
    container?: CSSProperties;
  };
};

export default function PokemonTypeCard({
  pokemonType,
  iconSize,
  showLabel = true,
  styles,
}: TProps) {
  return (
    <Container gap="12px" align="center" style={{ ...styles?.container }}>
      <Icon $pokemonType={pokemonType}>
        <Image
          src={require(`@/assets/pokemon-types/${pokemonType}.png`)}
          width={iconSize.width}
          height={iconSize.height}
          alt={pokemonType}
          loading="lazy"
        />
      </Icon>

      {showLabel && <Text>{pokemonType}</Text>}
    </Container>
  );
}

const Container = styled(Flex)`
  padding: 4px;
  border-radius: 4px;

  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
`;

const Text = styled.span`
  text-transform: capitalize;

  padding-right: 16px;
`;

const Icon = styled(Flex)<{ $pokemonType: TPokemonTypes }>`
  background-color: ${(props) => {
    return EPokemonTypesColors[props.$pokemonType] || "#ccc";
  }};

  padding: 4px 8px;
  border-radius: 4px;
`;
