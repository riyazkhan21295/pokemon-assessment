import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

import { fetchPokemon } from "@/services/api-services";
import PokemonPage from "@/page/pokemon";

const Page = async (params: any) => {
  const pokemonName = params.params.name;

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["pokemon", pokemonName],
    queryFn: () => fetchPokemon(pokemonName),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <PokemonPage />
    </HydrationBoundary>
  );
};

export default Page;
