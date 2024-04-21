import { useState } from "react";
import styled from "styled-components";
import Image from "next/image";

import { Flex } from "@/styles";

import pokeBallColoredPic from "@/assets/pokeBall-colored.svg";
import pokeBallOutlinedPic from "@/assets/pokeBall-outlined.svg";

type IProps = {
  pokemonId: string;
  pokemonName: string;
};

export default function PokemonCard({ pokemonId, pokemonName }: IProps) {
  const newPokemonId = pokemonId.padStart(3, "0");
  const pokemonImageUrl = `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${newPokemonId}.png`;

  const [imageStatus, setImageStatus] = useState("loading");

  const imageStatusSrcMapping = {
    loading: pokeBallColoredPic,
    loaded: pokemonImageUrl,
    failed: pokeBallOutlinedPic,
  };
  const imageSrc =
    imageStatusSrcMapping[imageStatus as keyof typeof imageStatusSrcMapping];

  return (
    <Container direction="column" gap="8px" justify="center" align="center">
      <PokemonId>{newPokemonId}</PokemonId>

      <Image
        loading="lazy"
        src={imageSrc}
        width={100}
        height={100}
        alt={newPokemonId}
        onLoadingComplete={() => setImageStatus("loaded")}
        onError={() => setImageStatus("failed")}
      />

      <PokemonName>{pokemonName}</PokemonName>
    </Container>
  );
}

const Container = styled(Flex)`
  cursor: pointer;

  background-color: #fff;
  padding: 8px;
  border-radius: 4px;

  flex: 1;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 3px 0px,
    rgba(0, 0, 0, 0.06) 0px 1px 2px 0px; /* tailwind */

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
    rgba(0, 0, 0, 0.06) 0px 1px 2px 0px; /* tailwind */
`;

const PokemonName = styled.span`
  text-transform: capitalize;
`;
