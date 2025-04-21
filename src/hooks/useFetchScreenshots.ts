"use client";

import { fetchScreenshots } from "@/app/api/games";
import { FetchGameProps } from "@/modules/game/types/FetchGame.type";
import { useQuery } from "@tanstack/react-query";

export function useFetchScreenshots({ gameId }: FetchGameProps) {
  return useQuery({
    queryKey: ["fetchScreenshots", gameId],
    queryFn: () => fetchScreenshots({ gameId }),
  });
}