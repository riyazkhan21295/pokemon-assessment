import PokemonListPage from "@/page/pokemon-list";
import { fetchPokemonTypes } from "@/services/api-services";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

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
