"use client";

import { fetchDLCS } from "@/api/games";
import { FetchGameProps } from "@/modules/game/types/FetchGame.type";
import { useQuery } from "@tanstack/react-query";

export function useFetchDLCS({ gameId }: FetchGameProps) {
  return useQuery({
    queryKey: ["fetchDLCS", gameId],
    queryFn: () => fetchDLCS({ gameId }),
  });
}
