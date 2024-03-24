import { db } from "@/lib/db";

export const getAllGames = async () => {
  try {
    const allGames = await db.game.findMany({});

    return allGames;
  } catch {
    return null;
  }
};

export const getGameById = async (id: number) => {
  try {
    const game = await db.game.findFirst({
      where: { id },
    });

    return game;
  } catch {
    return null;
  }
};
