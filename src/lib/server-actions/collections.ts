"use server";

import prisma from "@/lib/prisma";

export async function addCollection(userId: string, name: string, gameId: number) {
  
  const collection = await prisma.collection.create({
    data: {
      userId,
      name,
      games: {
        create: {
          gameId,
        },
      },
    },
    include: {
      games: true,
    },
  });

  return {
    id: collection.id,
    name: collection.name,
    numGames: collection.games.length,
  };
}

export async function deleteCollection(userId: string, collectionId: number): Promise<void> {
  const collection = await prisma.collection.findFirst({
    where: {
      id: collectionId,
      userId,
    },
  });

  if (!collection) {
    throw new Error("Collection not found or user unauthorized.");
  }

  await prisma.collectionGame.deleteMany({
    where: {
      collectionId: collectionId,
    },
  });
  console.log('deleted the related games');
  

  await prisma.collection.delete({
    where: { id: collectionId },
  });
    console.log("deleted the collection!");
}

export async function getCollections(userId: string) {
  const collections = await prisma.collection.findMany({
    where: { userId },
    select: {
      name: true,
      id: true,
      _count: {
        select: { games: true },
      },
      games: {
        select: {
          gameId: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return collections.map((collection) => ({
    id: collection.id,
    name: collection.name,
    numGames: collection._count.games,
    games: collection.games.map((game) => ({ gameId: game.gameId })),
  }));
}

export async function getGamesInCollection(collectionId: number): Promise<number[]> {
  const collection = await prisma.collection.findUnique({
    where: { id: collectionId },
    select: {
      games: {
        select: { gameId: true },
      },
    },
  });

  return collection?.games.map((game) => game.gameId) || [];
}

export async function addGameToCollection(collectionId: number, gameId: number) {
  return await prisma.collectionGame.upsert({
    where: {
      collectionId_gameId: {
        collectionId,
        gameId,
      },
    },
    update: {},
    create: {
      collectionId,
      gameId,
    },
  });
}

export async function deleteGameFromCollection(collectionId: number, gameId: number) {
  return await prisma.collectionGame.delete({
    where: {
      collectionId_gameId: {
        collectionId,
        gameId,
      },
    },
  });
}

export async function getUserCollectionsWithGames(userId: string): Promise<
  Array<{
    id: number;
    name: string;
    games: { gameId: number }[];
  }>
> {
  
  try {
    const collections = await prisma.collection.findMany({
      where: { userId },
      select: {
        id: true,
        name: true,
        games: {
          select: {
            gameId: true,
          },
        },
      },
    });

    return collections;
  } catch (error) {
    console.error(`[Server Action] Error in getUserCollectionsWithGames for userId: ${userId}`, error);
    throw error;
  }
}