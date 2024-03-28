import { db } from "@/lib/db";

export const getArmyByUserIdAndGameId = async (
  userId: string,
  gameId: number
) => {
  try {
    const army = await db.army.findUnique({
      where: { userId, gameId },
    });

    return army;
  } catch {
    return null;
  }
};

export const getArmyWithUnitsByUserIdAndGameId = async (
  userId: string,
  gameId: number
) => {
  try {
    const army = await db.army.findFirst({
      where: { userId, gameId },
      relationLoadStrategy: "join",
      include: {
        units: true,
      },
    });

    return army;
  } catch {
    return null;
  }
};
