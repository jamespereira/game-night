import { db } from "@/lib/db";

export const getUnitsByArmyId = async (armyId: string) => {
  try {
    const units = await db.unit.findFirst({
      where: { armyId },
    });

    return units;
  } catch {
    return null;
  }
};
