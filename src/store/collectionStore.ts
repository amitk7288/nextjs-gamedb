import { create } from "zustand";
import { getCollections, getGamesInCollection, addCollection, deleteCollection, addGameToCollection, deleteGameFromCollection, getUserCollectionsWithGames } from "@/lib/server-actions/collections";

type Collection = {
  id: number;
  name: string;
  numGames: number;
  games?: { gameId: number }[] | undefined;
};

interface CollectionsState {
  collections: Collection[];
  gamesInCollection: number[];
  allGameIdsInCollections: number[];
  createCollection: (userId: string, name: string, gameId: number) => Promise<void>;
  deleteCollection: (userId: string, collectionId: number) => Promise<void>;
  fetchCollections: (userId: string) => Promise<void>;
  fetchGamesInCollection: (collectionId: number) => Promise<number[]>;
  addGameToCollection: (collectionId: number, gameId: number) => Promise<void>;
  deleteGameFromCollection: (collectionId: number, gameId: number) => Promise<void>;
  checkGameInCollections: (
    userId: string,
    gameId: number,
    targetCollectionId?: number
  ) => Promise<{
    isGameInAnyCollection: boolean;
    isGameInTargetCollection: boolean;
  }>;
}

export const useCollectionsStore = create<CollectionsState>((set, get) => ({
  collections: [],
  gamesInCollection: [],
  allGameIdsInCollections: [],

  createCollection: async (userId: string, name: string, gameId: number) => {
    const newCollection = await addCollection(userId, name, gameId);
    set({ collections: [...get().collections, newCollection] });
  },

  deleteCollection: async (userId: string, collectionId: number) => {
    await deleteCollection(userId, collectionId);
    set({ collections: get().collections.filter((c) => c.id !== collectionId) });
  },

  fetchCollections: async (userId: string) => {
    const collections = await getCollections(userId);
    set({ collections });
  },

  fetchGamesInCollection: async (collectionId: number) => {
    const games = await getGamesInCollection(collectionId);
    return games;
  },

  addGameToCollection: async (collectionId: number, gameId: number) => {
    await addGameToCollection(collectionId, gameId);
    const updatedGames = await getGamesInCollection(collectionId);
    set({ gamesInCollection: updatedGames });
  },

  deleteGameFromCollection: async (collectionId: number, gameId: number) => {
    await deleteGameFromCollection(collectionId, gameId); 
    const updatedGames = await getGamesInCollection(collectionId);
    set({ gamesInCollection: updatedGames });
  },

  checkGameInCollections: async (userId: string, gameId: number, targetCollectionId?: number) => {
    const collections = await getUserCollectionsWithGames(userId);

    const isGameInAnyCollection = collections.some((collection) => collection.games.some((game) => game.gameId === gameId));

    let isGameInTargetCollection = false;
    if (targetCollectionId) {
      const targetCollection = collections.find((collection) => collection.id === targetCollectionId);
      isGameInTargetCollection = !!targetCollection && targetCollection.games.some((game) => game.gameId === gameId);
    }

    return { isGameInAnyCollection, isGameInTargetCollection };
  },
}));