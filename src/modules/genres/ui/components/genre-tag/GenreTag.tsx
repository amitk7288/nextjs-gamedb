export default function GenreTag({ genre }: {genre: string}) {
  return (
    <div className="bg-drkbg/60 z-10 rounded-full px-2 py-1">
      <p className="xs:text-sm text-xs text-white md:text-base">{genre}</p>
    </div>
  );
}
