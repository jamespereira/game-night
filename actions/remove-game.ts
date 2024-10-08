"use server";

import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";

const removeGame = async (id) => {
  await db.game.delete({
    where: { id },
  });
  revalidatePath("/games/");
  return { success: "Game removed!" };
};

export default removeGame;
