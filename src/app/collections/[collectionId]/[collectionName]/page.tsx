"use client";
import CardGridPage from "@/modules/shared/ui/components/card-grid-page/CardGridPage";
//import GameCard from "@/modules/game/ui/components/gamecard/GameCard";
import { useParams } from "next/navigation";
import { PiSquaresFourDuotone } from "react-icons/pi";

export default function CollectionPage() {
  const params = useParams<{ collectionId: string; collectionName: string }>();
  const collectionName = params.collectionName;

  return (
    <CardGridPage title={`${collectionName}`} desc={`Games in this collection:`} icon={PiSquaresFourDuotone}>
      <p>games</p>
    </CardGridPage>
  );
}
