"use server";

import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";

const removeResult = async (id) => {
  await db.result.delete({
    where: { id },
  });
  revalidatePath("/");
  return { success: "Result removed!" };
};

export default removeResult;
