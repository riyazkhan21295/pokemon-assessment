import styled from "styled-components";

import { Flex } from "@/styles";

import PokemonList from "@/components/pokemon-list";
import { useState } from "react";
import Image from "next/image";
import { EPokemonTypesColors } from "@/types/enums";

type IProps = {
  pokemonTypes: { name: string; url: string }[];
};

export default function PokemonListContainer({ pokemonTypes }: IProps) {
  const [searchedPokemon, setSearchedPokemon] = useState("");

  return (
    <Container direction="column" gap="32px">
      <Flex>
        <InputField
          placeholder="Search Pokemon"
          onChange={(event) => setSearchedPokemon(event.target.value)}
          value={searchedPokemon}
        />
      </Flex>

      {pokemonTypes.map((pokemonType) => {
        return (
          <PokemonList
            key={pokemonType.name}
            pokemonType={pokemonType.name}
            apiUrl={pokemonType.url}
            searchedPokemonName={searchedPokemon}
            renderTitle={<PokemonTitle pokemonType={pokemonType.name} />}
          />
        );
      })}
    </Container>
  );
}

function PokemonTitle({ pokemonType }: { pokemonType: string }) {
  return (
    <PokemonTypeContainer gap="16px" align="center" pokemonType={pokemonType}>
      <PokemonTypeTitle>{pokemonType}</PokemonTypeTitle>

      <Image
        src={require(`@/assets/pokemon-types/${pokemonType}.png`)}
        width={24}
        height={24}
        alt={pokemonType}
      />
    </PokemonTypeContainer>
  );
}

const Container = styled(Flex)``;

const InputField = styled.input`
  min-width: 320px;
  padding: 8px;

  border: 1px solid #ccc;
  border-radius: 4px;

  font-size: 16px;
`;

const PokemonTypeContainer = styled(Flex)<{ pokemonType: string }>`
  padding: 16px;
  border-radius: 4px;

  background-color: ${(props) =>
    EPokemonTypesColors[props.pokemonType as keyof typeof EPokemonTypesColors]};
  border: 1px solid #fff;
`;

const PokemonTypeTitle = styled.h3`
  text-transform: uppercase;
  letter-spacing: 1px;
`;
