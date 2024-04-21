import { useState } from "react";
import styled from "styled-components";

import { Flex } from "@/styles";

import PokemonList from "@/components/pokemon-list";

type TProps = {
  pokemonTypes: { name: string; url: string }[];
};

export default function PokemonListContainer({ pokemonTypes }: TProps) {
  const [searchedPokemon, setSearchedPokemon] = useState("");

  return (
    <Flex direction="column" gap="32px">
      <Flex justify="center">
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
          />
        );
      })}
    </Flex>
  );
}

const InputField = styled.input`
  min-width: 320px;
  padding: 8px;

  border: 1px solid #ccc;
  border-radius: 4px;

  font-size: 16px;
`;
