"use client";

import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { GameCardProps } from "@/modules/game/types/GameCard.type";
import { PlatformIcons } from "@/modules/game/data/platformIcons";
import { RiHeart3Line, RiHeart3Fill, RiBookmarkFill, RiStarFill } from "react-icons/ri";
import { PiMagicWand, PiMagicWandFill } from "react-icons/pi";
import { MdOutlineBookmarkAdd } from "react-icons/md";
import cleanupSlug from "@/utils/slugify";


function GameCard({ title, img, rating, genre, parentPlatforms, id }: GameCardProps) {
   const [fav, setFav] = useState<boolean>(false);
   const [wish, setWish] = useState<boolean>(false);
   const [save, setSave] = useState<boolean>(false);

   const router = useRouter();

   const handleNavigate = () => {
    const slug = cleanupSlug(title);
    router.push(`/game/${id}/${slug}`);
   }

  return (
    <div data-testid="gamecard" className="h-[100%] cursor-pointer" onClick={handleNavigate}>
      <div className="text-drkcol grid w-full grid-rows-[200px_auto] overflow-hidden rounded-[10px] bg-slate-800">
        {/* Image Section */}
        <div className="relative flex h-full w-full cursor-pointer items-center justify-center overflow-hidden">
          <Image src={img} width={420} height={200} alt="game title" className="h-full w-[420px] object-cover" />
          {/* Icon Buttons */}
          <div className="absolute bottom-[10px] right-[10px] flex gap-[10px]">
            <button data-testid="fav-button" className="flex h-[30px] w-[30px] cursor-pointer items-center justify-center rounded-[8px] bg-[#252f3f] text-[18px] hover:border" onClick={() => setFav(prevState => !prevState)}>
              {fav ? <RiHeart3Fill data-testid="favedGame" className="text-red-500" /> : <RiHeart3Line data-testid="unfavedGame" />}
            </button>
            <button data-testid="wish-button" className="flex h-[30px] w-[30px] cursor-pointer items-center justify-center rounded-[8px] bg-[#252f3f] text-[18px] hover:border" onClick={() => setWish(prevState => !prevState)}>
              {wish ? <PiMagicWandFill data-testid="wishedGame" className="text-lime-500" /> : <PiMagicWand data-testid="unwishedGame" />}
            </button>
            <button data-testid="save-button" className="flex h-[30px] w-[30px] cursor-pointer items-center justify-center rounded-[8px] bg-[#252f3f] text-[18px] hover:border" onClick={() => setSave(prevState => !prevState)}>
              {save ? <RiBookmarkFill data-testid="savedGame" className="text-sky-500" /> : <MdOutlineBookmarkAdd data-testid="unsavedGame" className="text-xl" />}
            </button>
          </div>
        </div>

        {/* Info Section */}
        <div className="flex flex-col gap-[10px] p-[15px]">
          {/* Header (Title and Rating) */}
          <div className="grid grid-cols-[80%_20%]">
            <h3 data-testid="gameTitle" className="text-xl font-semibold text-white">
              {title}
            </h3>
            <div className="flex h-[fit-content] items-center justify-end gap-[5px]">
              <p>{rating?.toFixed(0)}</p>
              <div className="flex items-center justify-center">
                <RiStarFill className="text-yellow-600" />
              </div>
            </div>
          </div>

          {/* Genre */}
          <span className="text-sm">{genre}</span>

          {/* Platforms */}
          <div className="flex gap-[5px]">
            <ul data-testid="platform-icons" className="flex items-center gap-2">
              {parentPlatforms?.map((p) => {
                const platformIcon = PlatformIcons[p.platform.name];

                return platformIcon ? (
                  <li key={p.platform.id}>
                    {typeof platformIcon === "function" ? (
                      React.createElement(platformIcon, { className: "text-[16px]" }) // Render IconType
                    ) : (
                      <Image
                        src={platformIcon as string} // Render string-based `src` for Image
                        alt={p.platform.name}
                        width={20}
                        height={20}
                        className="w-[20px]"
                      />
                    )}
                  </li>
                ) : null;
              })}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GameCard