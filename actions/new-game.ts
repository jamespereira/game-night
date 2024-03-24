"use server";

import { NewGameSchema } from "@/schemas";
import * as z from "zod";
import { db } from "@/lib/db";
import { getUserById } from "@/data/user";

const newGame = async (values: z.infer<typeof NewGameSchema>) => {
  const validatedFields = NewGameSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }

  const { host, location, date, pointsLimit, teams } = validatedFields.data;

  // const teamDetails = teams.map((team) => ({
  //   teamNumber: team.teamNumber,
  //   users: team.users.map(user => getUserById(user))
  // }))

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

  return { success: "New game created!" };
};

export default newGame;
