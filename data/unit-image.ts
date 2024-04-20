import { db } from "@/lib/db";

export const getUnitImageById = async (unitId: string) => {
  try {
    const unitImage = await db.unitImage.findUnique({ where: { unitId } });
    return unitImage;
  } catch {
    return null;
  }
};
