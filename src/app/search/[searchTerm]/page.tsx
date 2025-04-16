"use client";

import React from "react";

import GameCard from "@/modules/game/ui/components/gamecard/GameCard";
import CardGridPage from "@/modules/shared/ui/components/card-grid-page/CardGridPage";
import { useFetchGamesByTitle } from "@/hooks/useFetchGamesByTitle";

import { PiMagnifyingGlassDuotone } from "react-icons/pi";

interface SearchTermParams {
  searchTerm: string;
}

export default function SearchTerm({ params }: { params: Promise<SearchTermParams> }) {
  const resolvedParams = React.use(params);
  const { searchTerm } = resolvedParams;


  const { data, isLoading, isError } = useFetchGamesByTitle({
    search: searchTerm,
  });

  if (isLoading) return <p>Search results loading...</p>
  if (isError) return <p>Sorry, there was an error</p>

  return (
    <>
      <CardGridPage title={`Search results`} desc={`Search term: ${searchTerm.replace(/-/g, " ")}`} icon={PiMagnifyingGlassDuotone}>
        {data?.results?.map(
          (game: {
            id: number;
            background_image: string;
            name: string;
            metacritic: number;
            genres: { name: string }[];
            slug: string;
            parent_platforms: {
              platform: {
                id: number;
                name: string;
                slug: string;
              };
            }[];
          }) => (
            <GameCard key={game.id} id={game.id} img={game.background_image} title={game.name} rating={game.metacritic} genre={game.genres[0]?.name} slug={game.slug} parentPlatforms={game.parent_platforms} />
          )
        )}
      </CardGridPage>
    </>
  );
}
