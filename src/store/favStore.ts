import { create } from "zustand";
import { addFav, deleteFav, getFavGameIds } from "@/lib/server-actions/favourites";

interface FavoritesState {
  favIds: number[];
  fetchFavorites: (userId: string) => Promise<void>;
  toggleFavorite: (userId: string, gameId: number) => Promise<void>;
}

export const useFavoritesStore = create<FavoritesState>((set, get) => ({
  favIds: [],
  fetchFavorites: async (userId: string) => {
    const ids = await getFavGameIds(userId);
    set({ favIds: ids });
  },
  toggleFavorite: async (userId: string, gameId: number) => {
    const { favIds } = get();
    if (favIds.includes(gameId)) {
      await deleteFav(userId, gameId);
      set({ favIds: favIds.filter((id) => id !== gameId) });
    } else {
      await addFav(userId, gameId);
      set({ favIds: [...favIds, gameId] });
    }
  },
}));