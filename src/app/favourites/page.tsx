"use client";

import CardGridPage from "@/modules/shared/ui/components/card-grid-page/CardGridPage";
import GameCard from "@/modules/game/ui/components/gamecard/GameCard";
import { PiHeartDuotone } from "react-icons/pi";
import { useFavoritesStore } from "@/store/favStore";
import { useAuth } from "@clerk/nextjs";
import { useState, useEffect } from "react";
import { fetchGameById } from "../api/games";

export default function Favourites() {
  const { userId } = useAuth();
  const { favIds, fetchFavorites, toggleFavorite } = useFavoritesStore();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [favouriteGames, setFavouriteGames] = useState<any[]>([]);


  useEffect(() => {
    if (userId) {
      fetchFavorites(String(userId));
    }
  }, [userId, fetchFavorites]);

  useEffect(() => {
    if (favIds.length > 0) {
      Promise.all(favIds.map((gameId) => fetchGameById({ gameId })))
        .then((games) => {
          setFavouriteGames(games);
        })
        .catch((error) => {
          console.error("Error fetching favorite games:", error);
        });
    } else {
      setFavouriteGames([]);
    }
  }, [favIds]);

  return (
    <CardGridPage title={`Favourites`} desc={`A list of all your favourite games!`} icon={PiHeartDuotone}>
      {favouriteGames.map((game) => (
        <GameCard
          key={game.id}
          id={game.id}
          title={game.name}
          img={game.background_image}
          rating={game.metacritic}
          genre={game.genres[0]?.name}
          slug={game.slug}
          parentPlatforms={game.parent_platforms}
          isFav={favIds.includes(game.id)}
          onFavClick={(gameId: number) => {
            if (userId) toggleFavorite(String(userId), gameId);
          }}
        />
      ))}
    </CardGridPage>
  );
}
