"use client";

import GenreCard from "@/modules/genres/ui/components/genre-card/GenreCard";
import CardGridPage from "@/modules/shared/ui/components/card-grid-page/CardGridPage";
import { useFetchGenres } from "@/hooks/useFetchGenres";
import { PiSquaresFourDuotone } from "react-icons/pi";

export default function Genres() {
  const { data, isPending, isError } = useFetchGenres();
  
  if (isPending) return <p>Genres loading...</p>;
  if (isError) return <p>Sorry, there was an error loading the genres</p>;

  return (
    <CardGridPage title={`Genres`} desc={`Games categorised by genre`} icon={PiSquaresFourDuotone}>
      {data?.results.map((genre: {id: number, name: string, games_count: number, slug: string, image_background: string}) => (
        <div key={genre.id}>
          <GenreCard title={genre.name} games={genre.games_count.toLocaleString()} slug={genre.slug} genreId={genre.id} img={genre.image_background} />
        </div>
      ))}
    </CardGridPage>
  );
}
