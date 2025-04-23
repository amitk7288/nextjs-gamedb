"use server";

import prisma from "@/lib/prisma";

export async function addWish(userId: string, gameId: number) {
  console.log(`Attempting to add wish game with id ${gameId} to user - ${userId}`);
  try {
    const existingWish = await prisma.wishlist.findFirst({
      where: {
        userId,
        gameId,
      },
    });

    if (existingWish) {
      console.log(`game with id ${gameId}, is already in wishlist!`);
      return;
    }

    const wishGame = await prisma.wishlist.create({
      data: {
        userId,
        gameId,
        createdAt: new Date(),
      },
    });

    console.log(`succesfully added game`);

    return wishGame;
  } catch (error) {
    console.error("Error adding to game to wishlist:", error);
  }
}

export async function deleteWish(userId: string, gameId: number) {
  try {
    const gameToDel = await prisma.wishlist.delete({
      where: {
        userId_gameId: {
          userId,
          gameId,
        },
      },
    });

    console.log(`succesfully deleted game`);

    return gameToDel;
  } catch (error) {
    console.error("Error removing game from wishlist:", error);
  }
}

export async function getWishGameIds(userId: string): Promise<number[]> {
  const wishGames = await prisma.wishlist.findMany({
    where: { userId },
    select: { gameId: true },
  });
  return wishGames.map((wish) => wish.gameId);
}
