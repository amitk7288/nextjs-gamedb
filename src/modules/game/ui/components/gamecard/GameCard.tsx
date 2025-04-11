import Image from "next/image";
import { GameCardProps } from "@/modules/game/types/GameCard.type";

function GameCard({title, img, rating, genre}: GameCardProps) {
  return (
    <div data-testid="gamecard" className="h-[100%] cursor-pointer">
      <div className="text-drkcol grid w-full grid-rows-[200px_auto] overflow-hidden rounded-[10px] bg-slate-800">
        {/* Image Section */}
        <div className="relative flex h-full w-full cursor-pointer items-center justify-center overflow-hidden">
          <Image src={img} width={420} height={200} alt="game title" className="h-full w-[420px] object-cover" />
          {/* Icon Buttons */}
          <div className="absolute bottom-[10px] right-[10px] flex gap-[10px]">
            <button data-testid="fav-button" className="flex h-[30px] w-[30px] cursor-pointer items-center justify-center rounded-[8px] bg-[#252f3f] text-[18px] hover:border">
              f
            </button>
            <button data-testid="wish-button" className="flex h-[30px] w-[30px] cursor-pointer items-center justify-center rounded-[8px] bg-[#252f3f] text-[18px] hover:border">
              w
            </button>
            <button data-testid="save-button" className="flex h-[30px] w-[30px] cursor-pointer items-center justify-center rounded-[8px] bg-[#252f3f] text-[18px] hover:border">
              s
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
              <p>{rating}</p>
              <div className="flex items-center justify-center"></div>
            </div>
          </div>

          {/* Genre */}
          <span className="text-sm">{genre}</span>

          {/* Platforms */}
          <div className="flex gap-[5px]">
            <ul data-testid="platform-icons" className="flex items-center gap-2"></ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GameCard