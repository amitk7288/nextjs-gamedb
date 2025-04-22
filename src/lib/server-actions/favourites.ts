"use server"

import prisma from "@/lib/prisma";

export async function addFav(userId: string, gameId: number) {
  console.log(`Attempting to add fav game with id ${gameId} to user - ${userId}`);
  try {
    const existingFav = await prisma.favorite.findFirst({
      where: {
        userId,
        gameId,
      },
    })

    if (existingFav) {
      console.log(`game with id ${gameId}, is already favd!`);
      return;
    }

    const favGame = await prisma.favorite.create({
      data: {
        userId,
        gameId,
        createdAt: new Date(),
      }
    })

    console.log(`succesfully added game`);
    
    return favGame;

  } catch (error) {
    console.error("Error adding to game to favs:", error);
  }
}

export async function deleteFav(userId: string, gameId: number) {
  try {
    const gameToDel = await prisma.favorite.delete({
      where: {
        userId_gameId: {
          userId,
          gameId,
        }
      }
    })

    console.log(`succesfully deleted game`);

    return gameToDel;
    
  } catch (error) {
    console.error("Error removing game from favs:", error);
  }
}

export async function getFavGameIds(userId: string): Promise<number[]> {
  const favs = await prisma.favorite.findMany({
    where: { userId },
    select: { gameId: true },
  });
  return favs.map((fav) => fav.gameId);
}
