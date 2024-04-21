"use client";

import { Flex } from "@/styles";

import PokemonTypes from "@/components/pokemon-types";

export default function PokemonListPage() {
  return (
    <Flex direction="column" gap="16px">
      <PokemonTypes />
    </Flex>
  );
}
