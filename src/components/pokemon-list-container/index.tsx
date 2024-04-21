import styled from "styled-components";

import { Flex } from "@/styles";
import PokemonList from "@/components/pokemon-list";

type IProps = {
  pokemonTypes: { name: string; url: string }[];
};

export default function PokemonListContainer({ pokemonTypes }: IProps) {
  return (
    <Container direction="column" gap="16px">
      {/* Search */}

      {[...pokemonTypes.reverse()].map((pokemonType) => {
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

const PokemonListItemContainer = styled(Flex)``;

const PokemonTypeTitle = styled.h3`
  text-transform: uppercase;
  letter-spacing: 1px;
`;
