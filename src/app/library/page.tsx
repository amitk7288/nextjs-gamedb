import CardGridSection from "@/modules/shared/ui/components/card-grid-section/CardGridSection";
import { PiBookDuotone, PiHeartDuotone, PiMagicWandDuotone } from "react-icons/pi";

export default function Library() {
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
      <CardGridSection title={`Favourites`} icon={PiHeartDuotone} btnLink={`/favourites`}>
        <p>hello</p>
      </CardGridSection>

      <CardGridSection title={`Wishlist`} icon={PiMagicWandDuotone} btnLink={`/wishlist`}>
        <p>hello</p>
      </CardGridSection>
    </>
  );
}