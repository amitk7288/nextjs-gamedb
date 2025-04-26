"use client";

import { fetchGameById } from "@/app/api/games";
import { FetchGameProps } from "@/modules/game/types/FetchGame.type";
import { useQuery } from "@tanstack/react-query";

export function useFetchGame({ gameId }: FetchGameProps) {
  return useQuery({
    queryKey: ["fetchGame", gameId || null],
    queryFn: () => {
      if (!gameId) return Promise.resolve(null);
      return fetchGameById({ gameId });
    },
    enabled: !!gameId,
  });
}
