import { useQuery } from "@tanstack/react-query";
import { fetchGenres } from "@/api/genres";

export function useFetchGenres() {
  return useQuery({
    queryKey: ["genres"],
    queryFn: fetchGenres,
  });
}