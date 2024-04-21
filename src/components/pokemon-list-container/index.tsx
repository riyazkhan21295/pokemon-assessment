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
    <Container direction="column" gap="32px" align="center">
      <Flex>
        <InputField
          placeholder="Search Pokemon"
          onChange={(event) => setSearchedPokemon(event.target.value)}
          value={searchedPokemon}
        />
      </Flex>

      {pokemonTypes.map((pokemonType) => {
        return (
          <PokemonListItemContainer
            key={pokemonType.name}
            direction="column"
            gap="16px"
            align="flex-start"
          >
            <PokemonTypeContainer
              gap="16px"
              align="center"
              pokemonType={pokemonType.name}
            >
              <PokemonTypeTitle>{pokemonType.name}</PokemonTypeTitle>

              <Image
                src={require(`@/assets/pokemon-types/${pokemonType.name}.png`)}
                width={24}
                height={24}
                alt={pokemonType.name}
              />
            </PokemonTypeContainer>

            <PokemonList
              pokemonType={pokemonType.name}
              apiUrl={pokemonType.url}
              searchedPokemonName={searchedPokemon}
            />
          </PokemonListItemContainer>
        );
      })}
    </Container>
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

const PokemonListItemContainer = styled(Flex)``;

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
