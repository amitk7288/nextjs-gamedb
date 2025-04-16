"use client";

import { fetchGameById } from "@/api/games";
import { FetchGameProps } from "@/modules/game/types/FetchGame.type";
import { useQuery } from "@tanstack/react-query";

export function useFetchGame({gameId}: FetchGameProps) {
  return useQuery({
    queryKey: ["fetchGame", gameId],
    queryFn: () => fetchGameById({ gameId }),
  });
}