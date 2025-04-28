"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@clerk/nextjs";
import { fetchGameById } from "../api/games";
import CardGridSection from "@/modules/shared/ui/components/card-grid-section/CardGridSection";
import GameCard from "@/modules/game/ui/components/gamecard/GameCard";
import { useFavoritesStore } from "@/store/favStore";
import { useWishStore } from "@/store/wishStore";
import { PiBookDuotone, PiHeartDuotone, PiMagicWandDuotone } from "react-icons/pi";

export default function Library() {
  const { userId } = useAuth();
  const { favIds, fetchFavorites, toggleFavorite } = useFavoritesStore();
  const {wishIds, fetchWishes, toggleWishes} = useWishStore();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [favouriteGames, setFavouriteGames] = useState<any[]>([]);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [wishGames, setWishGames] = useState<any[]>([]);

  // fav games
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
    <>
      <div className="mb-6 flex flex-col gap-3 p-2">
        <div className="mb-6 flex flex-col items-start gap-2">
          <div className="flex flex-wrap items-center gap-2 text-[60px] font-semibold dark:text-white">
            <PiBookDuotone />
            <p className="capitalize">Library</p>
          </div>
          <p className="font-light">Your game library, here you can see at a glance some of your favourite/wishlist games</p>
        </div>
      </div>
      <CardGridSection title={`Favourites`} icon={PiHeartDuotone} btnText={`Favourite`} btnLink={`/favourites`}>
        {favouriteGames.length > 0 &&
          favouriteGames
            .slice(-3)
            .reverse()
            .map((game) => (
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
      </CardGridSection>

      <CardGridSection title={`Wishlist`} icon={PiMagicWandDuotone} btnText={`Wishlist`} btnLink={`/wishlist`}>
        {wishGames.length > 0 &&
          wishGames.slice(-3)
            .reverse()
            .map((game) => (
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
      </CardGridSection>
    </>
  );
}
