"use client";

import React, { useState, useEffect } from "react";
import { PiPlusBold } from "react-icons/pi";
import { useCollectionsStore } from "@/store/collectionStore";
import { useAuth } from "@clerk/nextjs";
import { DialogClose } from "@radix-ui/react-dialog";

type AddToCollectionProps = {
  gameId: number;
  setIsDialogOpen: (open: boolean) => void;
};

export default function AddToCollection({ gameId, setIsDialogOpen }: AddToCollectionProps) {
  const { userId } = useAuth();
  const { collections, fetchCollections, createCollection, addGameToCollection, deleteGameFromCollection } = useCollectionsStore();
  const [newCollectionValue, setNewCollectionValue] = useState<string | number>("");
  const [newCollectionField, setNewCollectionField] = useState(false);
  const maxChars: number = 40;

  useEffect(() => {
    if (userId) {
      fetchCollections(String(userId));
    }
  }, [fetchCollections, userId]);  

  console.log(collections);
  

  function handleChangeChars(e: React.ChangeEvent<HTMLInputElement>) {
    const typedCharsLength = e.target.value.length;
    if (typedCharsLength <= maxChars) {
      setNewCollectionValue(typedCharsLength);
    } else {
      setNewCollectionValue(maxChars);
      e.target.value = e.target.value.substring(0, maxChars);
    }
    setNewCollectionValue(e.target.value);
  }

  const handleCreateNewCollection = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    console.log(`created collection - ${newCollectionValue}`);
    createCollection(String(userId), String(newCollectionValue), gameId);
    setIsDialogOpen(false);
  };

  const handleGameInCollection = async (collectionId: number, gameId: number, isChecked: boolean) => {
    if (!isChecked) {
      await deleteGameFromCollection(collectionId, gameId);
    } else {
      await addGameToCollection(collectionId, gameId);
    }
    setIsDialogOpen(false); 
  };

  return (
    <div className="flex flex-col">
      <div className="flex-1 px-4 pb-0 pt-0">
        <form>
          <p className="xs:text-2xl text-xl font-medium">Save game to...</p>
          <div className="mt-2 flex flex-col gap-5">
            <div>
              {collections.length !== 0 ? (
                collections.map((c: { id: number; name: string; }) => {

                  const isChecked = collections?.find((collection) => collection.id === c.id)?.games?.some((game) => game.gameId === Number(gameId)) || false;

                  return (
                    <div key={c.id} className="flex items-center gap-2">
                      <label htmlFor={`collection-${c.id}`} className="flex items-center gap-2">
                        <input type="checkbox" id={`collection-${c.id}`} name={`collection-${c.id}`} className="h-4 w-4"  checked={isChecked} 
                        onChange={(e) => handleGameInCollection(c.id, gameId, e.target.checked)} />
                      </label>
                      <p className="xs:text-lg font-light">{c.name}</p>
                    </div>
                  );
                })
              ) : (
                <p>no collections</p>
              )}
            </div>
            <div id="new_collection">
              {newCollectionField ? (
                <div>
                  <input type="text" value={newCollectionValue} placeholder="Enter new collection name..." autoFocus className="dark:text-white block w-full rounded-md border-0 px-2 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-500 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:leading-6" onChange={(e) => handleChangeChars(e)} />
                </div>
              ) : (
                <div className="flex cursor-pointer items-center gap-2" onClick={() => setNewCollectionField(true)}>
                  <PiPlusBold />
                  <p className="xs:text-xl text-lg font-light">Create new collection</p>
                </div>
              )}
            </div>
          </div>
          {newCollectionField && (
            <div className="mt-6 flex items-center justify-end gap-x-6">
              <DialogClose asChild>
                <button onClick={(e) => handleCreateNewCollection(e)} type="submit" disabled={!newCollectionValue} className={`cursor-pointer rounded-md ${newCollectionValue ? `bg-gradient-to-r from-blue-500 to-green-600 hover:from-green-600 hover:to-blue-500` : `bg-gray-500`} px-3 py-1.5 font-semibold text-white shadow-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600`}>
                  Create
                </button>
              </DialogClose>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
