"use client";
import CardGridPage from "@/modules/shared/ui/components/card-grid-page/CardGridPage";
import GameCard from "@/modules/game/ui/components/gamecard/GameCard";
import { useParams } from "next/navigation";
import { PiSquaresFourDuotone } from "react-icons/pi";
import { useCollectionsStore } from "@/store/collectionStore";
import { useEffect, useState } from "react";
import { fetchGameById } from "@/app/api/games";
import { useFavoritesStore } from "@/store/favStore";
import { useWishStore } from "@/store/wishStore";
import { useAuth } from "@clerk/nextjs";

export default function CollectionPage() {
  const { userId } = useAuth();
  const { fetchGamesInCollection } = useCollectionsStore();
  const { favIds, toggleFavorite } = useFavoritesStore();
  const { wishIds, toggleWishes } = useWishStore();
  const params = useParams<{ collectionId: string; collectionName: string }>();
  const collectionName = params.collectionName;
  const collectionId = parseInt(params.collectionId);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [gamesData, setGamesData] = useState<any[]>([]);

  useEffect(() => {
    async function loadCollectionGames() {
      try {
        const ids = await fetchGamesInCollection(collectionId);

        const games = await Promise.all(
          ids.map(async (id) => {
            return await fetchGameById({ gameId: id });
          })
        );
        setGamesData(games);
      } catch (err) {
        console.error("Error fetching games:", err);
      }
    }
    loadCollectionGames();
  }, [collectionId, fetchGamesInCollection]);

  return (
    <CardGridPage title={`${collectionName} (${gamesData.length})`} desc={`Games in this collection:`} icon={PiSquaresFourDuotone}>
      {gamesData.map((game) => (
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