"use server";

import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";

const removeUnit = async (id) => {
  // TO DO remove unit from army
  await db.unit.delete({
    where: { id },
  });
  revalidatePath("/games/");
  return { success: "Unit removed!" };
};

export default removeUnit;
