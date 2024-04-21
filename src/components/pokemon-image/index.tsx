import { useState } from "react";

import pokeBallColoredPic from "@/assets/pokeBall-colored.svg";
import pokeBallOutlinedPic from "@/assets/pokeBall-outlined.svg";
import Image from "next/image";
import styled from "styled-components";

type TProps = {
  pokemonId: string | number;
  alternateImageSrc?: string;
  width: number;
  height: number;
  scaleImage?: boolean;
};

enum EImageStatus {
  loading = "loading",
  loaded = "loaded",
  failed = "failed",
}

type TImageStatus = `${EImageStatus}`;

export default function PokemonImage({
  pokemonId: pokemonIdProp,
  alternateImageSrc,
  width,
  height,
  scaleImage = false,
}: TProps) {
  const pokemonId = pokemonIdProp.toString().padStart(3, "0");
  const pokemonImageUrl = `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${pokemonId}.png`;

  const [imageStatus, setImageStatus] = useState<TImageStatus>(
    EImageStatus.loading
  );

  const imageStatusSrcMapping = {
    loading: pokeBallColoredPic,
    loaded: pokemonImageUrl,
    failed: alternateImageSrc || pokeBallOutlinedPic,
  };
  const imageSrc =
    imageStatusSrcMapping[imageStatus as keyof typeof imageStatusSrcMapping];

  return (
    <Container $imageStatus={imageStatus} $scaleImage={scaleImage}>
      <Image
        loading="lazy"
        src={imageSrc}
        width={width}
        height={height}
        alt={pokemonId}
        onLoadingComplete={() => setImageStatus(EImageStatus.loaded)}
        onError={() => setImageStatus(EImageStatus.failed)}
      />
    </Container>
  );
}

type TStyledContainerProps = {
  $imageStatus: TImageStatus;
  $scaleImage?: boolean;
};

const Container = styled.div<TStyledContainerProps>`
  ${(props) => {
    if (!props.$scaleImage || props.$imageStatus !== EImageStatus.loaded)
      return "";

    return `
        &:hover {
            transform: scale(2);
            transition: all 1s;
        }    
    `;
  }}
`;
