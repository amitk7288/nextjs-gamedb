"use client";

import { useEffect } from "react";
import CardGridPage from "@/modules/shared/ui/components/card-grid-page/CardGridPage";
import GameCard from "@/modules/game/ui/components/gamecard/GameCard";
import { useParams } from "next/navigation";
import { useFetchGames } from "@/hooks/useFetchGames";
import { useFetchGenres } from "@/hooks/useFetchGenres";
import { PiSquaresFourDuotone } from "react-icons/pi";
import { useAuth } from "@clerk/nextjs";
import { useFavoritesStore } from "@/store/favStore";

export default function Genre() {
  const { userId } = useAuth();

  const { favIds, fetchFavorites, toggleFavorite } = useFavoritesStore();
  useEffect(() => {
    if (userId) {
      fetchFavorites(String(userId));
    }
  }, [userId, fetchFavorites]);
  const params = useParams<{genreId: string, genreTitle: string}>();
  const gameGenreId = parseInt(params.genreId);

  const {data: genresData} = useFetchGenres();
  
  const { data, isPending, isError } = useFetchGames({
    genreId: gameGenreId,
    page: 1,
    pageSize: 40,
  });

  if (isPending) return <p>Loading games...</p>;
  if (isError) return <p>Error loading games</p>;
  
  const genreTitle = genresData.results.find((genre: { id: number; name: string; games_count: number; slug: string; image_background: string }) => genre.id === gameGenreId);  

  return (
    <CardGridPage title={`${genreTitle.name} games`} desc={`A list of ${genreTitle.name} games`} icon={PiSquaresFourDuotone}>
      {data?.map((game) => (
        <GameCard
          key={game.id}
          id={game.id}
          title={game.name}
          img={game.background_image}
          rating={game.metacritic}
          genre={game.genres[0]?.name}
          slug={game.slug}
          parentPlatforms={game.parent_platforms}
          isFav={favIds.includes(Number(game.id))}
          onFavClick={(gameId: number) => {
            if (userId) toggleFavorite(String(userId), gameId);
          }}
        />
      ))}
    </CardGridPage>
  );
}
