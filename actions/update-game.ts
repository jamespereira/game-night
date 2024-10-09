"use server";

import { NewGameSchema } from "@/schemas";
import * as z from "zod";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";

const updateGame = async (values: z.infer<typeof NewGameSchema>, gameId) => {
  const validatedFields = NewGameSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }

  const { host, location, date, pointsLimit, teams } = validatedFields.data;

  await db.game.update({
    where: {
      id: gameId,
    },
    data: {
      host,
      location,
      date,
      pointsLimit: Number(pointsLimit),
    },
  });

  teams.forEach(
    async (t) =>
      await db.team.updateMany({
        where: {
          AND: {
            gameId: gameId,
          },
          teamNumber: t.teamNumber,
        },
        data: {
          users: t.users,
        },
      })
  );

  revalidatePath("/");
  return { success: "Game updated!" };
};

export default updateGame;
