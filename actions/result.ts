"use server";

import { ResultSchema } from "@/schemas";
import * as z from "zod";
import { db } from "@/lib/db";
import { getUserById } from "@/data/user";
import { revalidatePath } from "next/cache";
import { getExtendedResultByGameId, getResultByGameId } from "@/data/result";
import { v4 as uuidv4 } from "uuid";

const result = async (values: z.infer<typeof ResultSchema>, gameId) => {
  const validatedFields = ResultSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }

  const { winner, loser, battleReport } = validatedFields.data;
  const battlePlan = battleReport.battlePlan;
  // const rounds = battleReport.rounds;

  const existingResult = await getExtendedResultByGameId(gameId);

  if (!existingResult) {
    if (!battleReport) {
      await db.result.create({
        data: {
          gameId,
          winner,
          loser,
        },
      });
    } else {
      await db.result.create({
        data: {
          gameId,
          winner,
          loser,
          battleReport: {
            create: { id: uuidv4(), battlePlan },
          },
        },
      });
    }

    revalidatePath("/");
    return { success: "Result created!" };
  }

  if (!battleReport) {
    await db.result.update({
      where: { id: existingResult.id },
      data: {
        winner,
        loser,
      },
    });
  } else {
    if (!existingResult.battleReport) {
      await db.result.update({
        where: { id: existingResult.id },
        data: {
          winner,
          loser,
          battleReport: {
            create: { id: uuidv4(), battlePlan },
          },
        },
      });
    } else {
      await db.result.update({
        where: { id: existingResult.id },
        data: {
          winner,
          loser,
          // battleReport: {
          //   update: { battlePlan },
          // },
        },
        include: {
          battleReport: true,
        },
      });
    }
  }

  revalidatePath("/");
  return { success: "Result updated!" };
};

export default result;
