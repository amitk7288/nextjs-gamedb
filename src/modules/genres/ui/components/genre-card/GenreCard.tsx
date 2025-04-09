import Link from "next/link";
import Image from "next/image";
import { GenreCardProps } from "@/modules/genres/types/GenreCard.type";

export default function GenreCard({ title, games, slug, img, genreId }: GenreCardProps) {
  return (
    <Link href={`/genre/${genreId}/${slug}`}>
      <div className="to text-drkcol grid w-full max-w-[500px] grid-rows-[200px_auto] overflow-hidden rounded-[10px] bg-slate-800 bg-gradient-to-t from-black to-[#252f3f] p-3">
        <Image src={img} className="h-[200px] w-[350px] rounded-t-lg object-cover" alt={title} />
        <div className="mt-4 flex flex-col items-center gap-2">
          <p className="text-center text-2xl font-semibold text-white underline">{title}</p>
          <div>
            <p className="text-lg">{games} games</p>
          </div>
        </div>
      </div>
    </Link>
  );
}
