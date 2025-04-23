"use client";

import CardGridPage from "@/modules/shared/ui/components/card-grid-page/CardGridPage";
import GameCard from "@/modules/game/ui/components/gamecard/GameCard";
import { PiMagicWandDuotone } from "react-icons/pi";
import { useWishStore } from "@/store/wishStore";
import { useFavoritesStore } from "@/store/favStore";
import { useAuth } from "@clerk/nextjs";
import { useState, useEffect } from "react";
import { fetchGameById } from "../api/games";

export default function Wishlist() {
  const { userId } = useAuth();
  const { wishIds, fetchWishes, toggleWishes } = useWishStore();
  const { favIds, toggleFavorite } = useFavoritesStore();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [wishGames, setWishGames] = useState<any[]>([]);

  // wishlist games
  useEffect(() => {
    if (userId) {
      fetchWishes(String(userId));
    }
  }, [userId, fetchWishes]);
  useEffect(() => {
    if (wishIds.length > 0) {
      Promise.all(wishIds.map((gameId) => fetchGameById({ gameId })))
        .then((games) => {
          setWishGames(games);
        })
        .catch((error) => {
          console.error("Error fetching wishlist games:", error);
        });
    } else {
      setWishGames([]);
    }
  }, [wishIds]);


  return (
    <CardGridPage title={`Wishlist (${wishGames.length})`} desc={`${wishGames.length > 0 ? `A list of all the games you want!`: `No games in Wishlist, add some now to get started` }`} icon={PiMagicWandDuotone}>
      {wishGames.length > 0 && wishGames.map((game) => (
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
          isWish={wishIds.includes(game.id)}
          onWishClick={(gameId: number) => {
            if (userId) toggleWishes(String(userId), gameId);
          }}
        />
      ))}
    </CardGridPage>
  );
}
