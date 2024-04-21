import { useQuery } from "@tanstack/react-query";

import { fetchPokemonTypes } from "@/services/api-services";
import { EPokemonTypes } from "@/types/enums";

import CardCheckbox from "@/components/card-checkbox";

type TPokemonTypes = `${EPokemonTypes}`;

type TResultDatatype = {
  name: TPokemonTypes;
  url: string;
};

type TDatatype = {
  // count: number;
  // next: boolean | null;
  // previous: boolean | null;
  results: TResultDatatype[];
};

type IProps = {
  onSelect: (items: any[]) => void;
};

export default function PokemonTypes({ onSelect }: IProps) {
  const { isLoading, isError, data } = useQuery<TDatatype>({
    queryKey: ["pokemon-types"],
    queryFn: fetchPokemonTypes,
  });

  if (isLoading) return <p>Loading...</p>;

  if (isError) return <p>Error</p>;

  return (
    <CardCheckbox
      selectable
      multiple
      items={data?.results || []}
      labelKey="name"
      valueKey="name"
      onSelect={onSelect}
    />
  );
}
