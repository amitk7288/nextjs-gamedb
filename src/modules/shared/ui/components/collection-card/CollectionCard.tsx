"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import game from "../../../../../../public/hogwarts-legacy.webp";
import hl1 from "../../../../../../public/hl-1.jpg";
import hl2 from "../../../../../../public/hl-2.jpg";
import { PiXBold } from "react-icons/pi";
import { Dialog, DialogContent, DialogTrigger, DialogTitle } from "@/modules/shared/ui/components/shadcn-comps/dialog";
import ConfirmDelete from "@/modules/shared/ui/components/confirm-delete/ConfirmDelete";
import cleanupSlug from "@/utils/slugify";

interface CollectionCardProps {
  title: string;
  numGames: number;
  id: number;
}

export default function CollectionCard({ title, numGames, id }: CollectionCardProps) {
  const router = useRouter();

  function handleNavigateClick() {
    const slug = cleanupSlug(title);
    router.push(`/collections/${id}/${slug}`);
  }

  return (
    <>
      <div onClick={handleNavigateClick} className="cursor-pointer">
        <div className="to text-drkcol relative grid w-full max-w-[500px] grid-rows-[200px_auto] overflow-hidden rounded-[10px] bg-slate-800 bg-gradient-to-t from-black p-3">
          <Dialog>
            <DialogTrigger asChild>
              <div onClick={(e) => e.stopPropagation()} role="button" tabIndex={0} className="absolute right-4 top-4">
                <PiXBold />
              </div>
            </DialogTrigger>
            <DialogContent>
              <DialogTitle className="sr-only" />
              <ConfirmDelete collectionId={id} />
            </DialogContent>
          </Dialog>
          <div className="mt-10 flex flex-col items-center gap-5">
            <p className="text-center text-2xl font-semibold text-white underline">{title}</p>
            <div>
              {numGames !== 0 ? (<p className="text-lg">{numGames === 1 ? `${numGames} game` : `${numGames} games`}</p>): <p>No games</p>}
            </div>
          </div>
          <div className="">
            <div className="grid grid-cols-3">
              <div>
                <Image src={game} alt="game" className="relative left-2 rounded-lg" />
              </div>
              <div className="mb-10">
                <Image src={hl1} alt="game" className="relative bottom-4 z-10 scale-125 rounded-lg" />
              </div>
              <div>
                <Image src={hl2} alt="game" className="relative right-2 rounded-lg" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
