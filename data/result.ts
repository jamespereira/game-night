import { db } from "@/lib/db";

export const getResultByGameId = async (gameId: number) => {
  try {
    const result = await db.result.findFirst({
      where: { gameId },
    });

    return result;
  } catch {
    return null;
  }
};

export const getExtendedResultByGameId = async (gameId: number) => {
  try {
    const result = await db.result.findFirst({
      where: { gameId },
      relationLoadStrategy: "join",
      include: {
        battleReport: {
          include: {
            rounds: {
              include: {
                turns: true,
              },
            },
          },
        },
      },
    });

    return result;
  } catch {
    return null;
  }
};

export const getAllResults = async () => {
  try {
    const results = await db.result.findMany();
    return results;
  } catch {
    return null;
  }
};
