import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

import { fetchPokemonTypes } from "@/services/api-services";

import PokemonListPage from "@/page/pokemon-list";

const PokemonPage = async () => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["pokemon-types"],
    queryFn: fetchPokemonTypes,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <PokemonListPage />
    </HydrationBoundary>
  );
};

export default PokemonPage;
