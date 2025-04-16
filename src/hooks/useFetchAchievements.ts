// "use client";

// import { fetchAchievements } from "@/api/games";
// import { FetchGameProps } from "@/modules/game/types/FetchGame.type";
// import { useQuery } from "@tanstack/react-query";

// export function useFetchAchievements({ gameId, page }: FetchGameProps) {
//   return useQuery({
//     queryKey: ["fetchAchievements", gameId],
//     queryFn: () => fetchAchievements({ gameId, page }),
//   });
// }

"use client";

import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchAchievements } from "@/api/games";
import { FetchGameProps } from "@/modules/game/types/FetchGame.type";
import { AchievementResponse } from "@/modules/game/types/AchievementRes.type";

export function useFetchAchievements({ gameId }: FetchGameProps) {
  return useInfiniteQuery({
    queryKey: ["fetchAchievements", gameId],
    queryFn: ({ pageParam = 1 }: { pageParam: number }) => fetchAchievements({ gameId, page: pageParam }),
    initialPageParam: 1,
    getNextPageParam: (lastPage: AchievementResponse) => {
      if (lastPage.next) {
        const nextPageMatch = lastPage.next.match(/page=(\d+)/);
        return nextPageMatch ? parseInt(nextPageMatch[1], 10) : null;
      }
      return undefined;
    },
  });
}
