"use client";

import { useEffect } from "react";
import FeaturedGame from "@/modules/home/ui/components/featured-game/FeaturedGame";
import CardGridSection from "@/modules/shared/ui/components/card-grid-section/CardGridSection";
import GameCard from "@/modules/game/ui/components/gamecard/GameCard";
import { useAuth } from "@clerk/nextjs";
import { useFetchGames } from "@/hooks/useFetchGames";
import { PiSwordBold } from "react-icons/pi";
import { GiPistolGun } from "react-icons/gi";
import { MdGamepad } from "react-icons/md";
import { useFavoritesStore } from "@/store/favStore";
import { useWishStore } from "@/store/wishStore";

export default function Home() {
 const { userId } = useAuth();

 const { favIds, fetchFavorites, toggleFavorite } = useFavoritesStore();
   useEffect(() => {
     if (userId) {
       fetchFavorites(String(userId));
     }
   }, [userId, fetchFavorites]);

 const { wishIds, fetchWishes, toggleWishes } = useWishStore();
   useEffect(() => {
     if (userId) {
       fetchWishes(String(userId));
     }
   }, [userId, fetchWishes]);
  
  const {
    data: actionGames,
    isPending: isActionPending,
    isError: isActionError,
    error: actionError,
  } = useFetchGames({
    genreId: 4,
    pageSize: 10,
  });

  const {
    data: rpgGames,
    isPending: isRpgPending,
    isError: isRpgError,
    error: rpgError,
  } = useFetchGames({
    genreId: 5,
    pageSize: 10,
  });

  const {
    data: indieGames,
    isPending: isIndiePending,
    isError: isIndieError,
    error: indieError,
  } = useFetchGames({
    genreId: 51,
    pageSize: 10,
  });  

const isLoading = isActionPending || isRpgPending || isIndiePending;
const isError = isActionError || isRpgError || isIndieError;

if (isLoading) return <p>Loading Games...</p>;
if (isError) return <p>Error Loading Games: {actionError?.message || rpgError?.message || indieError?.message}</p>;

  return (
    <>
      <div className="mb-5 flex items-center gap-3 rounded-lg p-2">
        <FeaturedGame />
      </div>
      <CardGridSection title={"Action"} icon={GiPistolGun} btnLink={`/genre/4/action`}>
        {actionGames?.map((game) => (
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

      <CardGridSection title={"RPG"} icon={PiSwordBold} btnLink={`/genre/5/role-playing-games-rpg`}>
        {rpgGames?.map((game) => (
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

      <CardGridSection title={"Indie"} icon={MdGamepad} btnLink={`/genre/51/indie`}>
        {indieGames?.map((game) => (
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
