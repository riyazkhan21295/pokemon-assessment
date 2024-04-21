import { CSSProperties } from "react";
import styled from "styled-components";

import { Flex } from "@/styles";

import PokemonImage from "@/components/pokemon-image";

type IProps = {
  pokemonId: string;
  pokemonType: string;
  pokemonName: string;
  styles?: { container: CSSProperties };
};

export default function PokemonCard({
  pokemonType,
  pokemonId,
  pokemonName,
}: IProps) {
  return (
    <Container direction="column" gap="8px" justify="center" align="center">
      <PokemonId>{pokemonId}</PokemonId>

      <PokemonImage pokemonId={pokemonId} width={100} height={100} scaleImage />

      <PokemonName>{pokemonName}</PokemonName>
    </Container>
  );
}

const Container = styled(Flex)`
  cursor: pointer;

  padding: 8px;
  border-radius: 4px;

  position: relative;
`;

const PokemonId = styled.div`
  background-color: aliceblue;

  position: absolute;
  top: 0;
  right: 0;

  padding: 4px;

  font-size: 12px;
  border-radius: 0 4px;

  &::before {
    content: "#";
  }

  box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 3px 0px,
    rgba(0, 0, 0, 0.06) 0px 1px 2px 0px;
`;

const PokemonName = styled.div`
  text-transform: capitalize;
`;
