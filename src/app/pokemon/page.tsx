import PokemonListPage from "@/page/pokemon-list";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

const PokemonPage = async () => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["pokemon-types"],
    queryFn: () => [],
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <PokemonListPage />
    </HydrationBoundary>
  );
};

export default PokemonPage;
