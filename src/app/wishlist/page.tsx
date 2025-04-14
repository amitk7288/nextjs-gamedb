import CardGridPage from "@/modules/shared/ui/components/card-grid-page/CardGridPage";
//import GameCard from "@/modules/game/ui/components/gamecard/GameCard";
import { PiMagicWandDuotone } from "react-icons/pi";

export default function Favourites() {
  
  return (
    <CardGridPage title={`Wishlist`} desc={`A list of all the games you want!`} icon={PiMagicWandDuotone}>
      <p>wish games</p>
    </CardGridPage>
  );
}
