"use client";

import { fetchRelated } from "@/app/api/games";
import { FetchGameProps } from "@/modules/game/types/FetchGame.type";
import { useQuery } from "@tanstack/react-query";

export function useFetchRelated({ gameId }: FetchGameProps) {
  return useQuery({
    queryKey: ["fetchRelated", gameId],
    queryFn: () => fetchRelated({ gameId }),
  });
}