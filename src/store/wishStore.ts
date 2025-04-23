import { create } from "zustand";
import { addWish, deleteWish, getWishGameIds } from "@/lib/server-actions/wishlist";

interface WishState {
  wishIds: number[];
  fetchWishes: (userId: string) => Promise<void>;
  toggleWishes: (userId: string, gameId: number) => Promise<void>;
}

export const useWishStore = create<WishState>((set, get) => ({
  wishIds: [],
  fetchWishes: async (userId: string) => {
    const ids = await getWishGameIds(userId);
    set({ wishIds: ids });
  },
  toggleWishes: async (userId: string, gameId: number) => {
    const { wishIds } = get();
    if (wishIds.includes(gameId)) {
      await deleteWish(userId, gameId);
      set({ wishIds: wishIds.filter((id) => id !== gameId) });
    } else {
      await addWish(userId, gameId);
      set({ wishIds: [...wishIds, gameId] });
    }
  },
}));