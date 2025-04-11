import { useQuery } from "@tanstack/react-query";
import { fetchGames } from "@/api/games";
import { FetchGameProps } from "@/modules/game/types/FetchGame.type";

export function useFetchGames({genreId, page = 1, pageSize = 40}: FetchGameProps) {
  return useQuery({
    queryKey: ["fetchGames", genreId],
    queryFn: () => fetchGames({genreId, page, pageSize}),
  });
}