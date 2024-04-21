import styled from "styled-components";

import { Flex } from "@/styles";

import PokemonList from "@/components/pokemon-list";

type IProps = {
  pokemonTypes: { name: string; url: string }[];
};

export default function PokemonListContainer({ pokemonTypes }: IProps) {
  return (
    <Container direction="column" gap="32px" align="center">
      <Flex>
        <InputField placeholder="Search Pokemon" />
      </Flex>

      {pokemonTypes.map((pokemonType) => {
        return (
          <PokemonListItemContainer
            key={pokemonType.name}
            direction="column"
            gap="16px"
          >
            <PokemonTypeTitle>{pokemonType.name}</PokemonTypeTitle>

            <PokemonList
              pokemonType={pokemonType.name}
              apiUrl={pokemonType.url}
              searchedPokemonName={undefined}
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

const PokemonTypeTitle = styled.h3`
  text-transform: uppercase;
  letter-spacing: 1px;
`;
