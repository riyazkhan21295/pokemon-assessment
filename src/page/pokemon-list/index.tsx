"use client";

import { useState } from "react";

import { Flex } from "@/styles";

import PokemonTypes from "@/components/pokemon-types";
import PokemonListContainer from "@/components/pokemon-list-container";
import Empty from "@/components/empty";

export default function PokemonListPage() {
  const [selectedTypes, setSelectedTypes] = useState<any[]>([]);

  return (
    <Flex direction="column" gap="16px">
      <PokemonTypes onSelect={setSelectedTypes} />

      {selectedTypes.length > 0 ? (
        <PokemonListContainer pokemonTypes={selectedTypes} />
      ) : (
        <Empty text="No Type Selected" />
      )}
    </Flex>
  );
}
