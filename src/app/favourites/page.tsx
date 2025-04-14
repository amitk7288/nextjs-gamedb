import CardGridPage from "@/modules/shared/ui/components/card-grid-page/CardGridPage";
//import GameCard from "@/modules/game/ui/components/gamecard/GameCard";
import { PiHeartDuotone } from "react-icons/pi";

export default function Favourites() {
  
  return (
    <CardGridPage title={`Favourites`} desc={`A list of all your favourite games!`} icon={PiHeartDuotone}>
      <p>fav games</p>
    </CardGridPage>
  );
}
