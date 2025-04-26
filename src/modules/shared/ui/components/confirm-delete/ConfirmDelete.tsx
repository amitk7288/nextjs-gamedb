"use client";

import { GrCircleAlert } from "react-icons/gr";
import { useCollectionsStore } from "@/store/collectionStore";
import { useAuth } from "@clerk/nextjs";
import { DialogClose } from "@radix-ui/react-dialog";

interface ConfirmDeleteProps {
  collectionId: number;
}

export default function ConfirmDelete({ collectionId }: ConfirmDeleteProps) {
  const { userId } = useAuth();
  const { deleteCollection } = useCollectionsStore();

  const handleDeleteCol = () => {
    if (userId) {
      deleteCollection(String(userId), collectionId)
    }
  }

  return (
    <div className="flex flex-col">
      <div className="flex flex-1 flex-col gap-4 px-4 pb-0 pt-0">
        <div className="flex flex-col gap-3 text-center dark:text-white">
          <div className="flex items-center justify-center gap-2">
            <GrCircleAlert className="text-2xl" />
            <p className="text-2xl font-semibold">Heads up!</p>
          </div>
          <p className="text-lg">You&apos;re about to send this collecton into Oblivion!</p>
          <p className="text-lg font-semibold">Are you sure?</p>
        </div>
        <div className="flex items-center justify-end gap-4">
          <DialogClose asChild>
            <button type="submit" className={`dark:border-drkbrd cursor-pointer rounded-md border px-3 py-1.5 shadow-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 dark:text-white`}>
              Cancel
            </button>
          </DialogClose>
          <button type="submit" className={`cursor-pointer rounded-md bg-red-500 px-3 py-1.5 font-semibold text-white shadow-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600`} onClick={handleDeleteCol}>
            DELETE
          </button>
        </div>
      </div>
    </div>
  );
}
