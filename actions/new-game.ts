"use server";

import { NewGameSchema } from "@/schemas";
import * as z from "zod";
import { db } from "@/lib/db";
import { getUserById } from "@/data/user";
import { revalidatePath } from "next/cache";

const newGame = async (values: z.infer<typeof NewGameSchema>) => {
  const validatedFields = NewGameSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }

  const { host, location, date, pointsLimit, teams } = validatedFields.data;

  await db.game.create({
    data: {
      host,
      location,
      date,
      pointsLimit: Number(pointsLimit),
      teams: {
        create: teams.map((team) => ({
          teamNumber: team.teamNumber,
          users: team.users,
        })),
      },
    },
    include: {
      teams: true,
    },
  });

  revalidatePath("/games/");
  return { success: "New game created!" };
};

export default newGame;
