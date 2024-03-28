"use server";

import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";

const removeArmyById = async (armyId: string) => {
  try {
    await db.army.delete({
      where: { id: armyId },
    });
    revalidatePath("/games/");
  } catch {
    return null;
  }
};

export default removeArmyById;
