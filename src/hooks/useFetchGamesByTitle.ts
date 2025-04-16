"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchGamesByTitle } from "@/api/games";

export function useFetchGamesByTitle({ search }: { search: string }) {
  return useQuery({
    queryKey: ["fetchGames", search],
    queryFn: () => fetchGamesByTitle({ search }),
  });
}
