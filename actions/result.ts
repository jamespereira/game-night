"use server";

import { ResultSchema } from "@/schemas";
import * as z from "zod";
import { db } from "@/lib/db";
import { getUserById } from "@/data/user";
import { revalidatePath } from "next/cache";
import { getResultByGameId } from "@/data/result";

const result = async (values: z.infer<typeof ResultSchema>, gameId) => {
  const validatedFields = ResultSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }

  const { winner, loser } = validatedFields.data;

  // const teamDetails = teams.map((team) => ({
  //   teamNumber: team.teamNumber,
  //   users: team.users.map(user => getUserById(user))
  // }))

  const existingResult = await getResultByGameId(gameId);

  if (!existingResult) {
    await db.result.create({
      data: {
        gameId,
        winner,
        loser,
      },
    });

    revalidatePath("/");
    return { success: "Result created!" };
  }

  await db.result.update({
    where: { id: existingResult.id },
    data: {
      winner,
      loser,
    },
  });

  revalidatePath("/");
  return { success: "Result updated!" };
};

export default result;
