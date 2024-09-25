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
