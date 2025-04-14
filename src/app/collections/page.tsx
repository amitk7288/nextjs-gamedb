import CardGridPage from "@/modules/shared/ui/components/card-grid-page/CardGridPage";
import CollectionCard from "@/modules/shared/ui/components/collection-card/CollectionCard";
import { PiBookmarkSimpleDuotone } from "react-icons/pi";

export default function Collections() {
  
  return (
    <CardGridPage title={`Collections`} desc={`A list of all your collections`} icon={PiBookmarkSimpleDuotone}>
      <CollectionCard title="text collection" numGames={10} id={99} />
    </CardGridPage>
  );
}
