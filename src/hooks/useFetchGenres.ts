import { useQuery } from "@tanstack/react-query";
import { fetchGenres } from "@/app/api/genres";

export function useFetchGenres() {
  return useQuery({
    queryKey: ["genres"],
    queryFn: fetchGenres,
  });
}