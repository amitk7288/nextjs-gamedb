"use client";

import CardGridPage from "@/modules/shared/ui/components/card-grid-page/CardGridPage";
import CollectionCard from "@/modules/shared/ui/components/collection-card/CollectionCard";
import { PiBookmarkSimpleDuotone } from "react-icons/pi";
import { useCollectionsStore } from "@/store/collectionStore";
import { useEffect } from "react";
import { useAuth } from "@clerk/nextjs";

export default function Collections() {
  const {userId} = useAuth();
  const {fetchCollections, collections} = useCollectionsStore();

  useEffect(() => {
    if (userId) {
      fetchCollections(String(userId));
    }
  }, [fetchCollections, userId]);



  return (
    <CardGridPage title={`Collections`} desc={`A list of all your collections`} icon={PiBookmarkSimpleDuotone}>
      {collections.map((c) => (
        <CollectionCard key={c.id} title={c.name} numGames={c.numGames} id={c.id} />
      ))}
    </CardGridPage>
  );
}
