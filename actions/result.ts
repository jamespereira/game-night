"use server";

import { ResultSchema } from "@/schemas";
import * as z from "zod";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { getExtendedResultByGameId } from "@/data/result";

const result = async (values: z.infer<typeof ResultSchema>, gameId) => {
  const validatedFields = ResultSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }

  const { winner, loser, battleReport } = validatedFields.data;
  const battlePlan = battleReport?.battlePlan;
  const rounds = battleReport?.rounds;

  const existingResult = await getExtendedResultByGameId(gameId);
  const xRounds = existingResult?.battleReport?.rounds;
  if (!existingResult) {
    await db.result.create({
      data: {
        gameId,
        winner,
        loser,
        battleReport: {
          create: {
            battlePlan,
            rounds: {
              create: [
                {
                  roundNumber: 1,
                  turns: {
                    createMany: {
                      data: rounds[0].turns.map((turn, turnIndex) => ({
                        teamNumber: turnIndex + 1,
                        position: turn.position,
                        battleTactic: turn.battleTactic,
                        btCompleted: turn.btCompleted,
                        objectivePoints: turn.objectivePoints,
                        victoryPoints: turn.victoryPoints,
                        conceded: turn.conceded,
                      })),
                    },
                  },
                },
                {
                  roundNumber: 2,
                  turns: {
                    createMany: {
                      data: rounds[1].turns.map((turn, turnIndex) => ({
                        teamNumber: turnIndex + 1,
                        position: turn.position,
                        battleTactic: turn.battleTactic,
                        btCompleted: turn.btCompleted,
                        objectivePoints: turn.objectivePoints,
                        victoryPoints: turn.victoryPoints,
                        conceded: turn.conceded,
                      })),
                    },
                  },
                },
                {
                  roundNumber: 3,
                  turns: {
                    createMany: {
                      data: rounds[2].turns.map((turn, turnIndex) => ({
                        teamNumber: turnIndex + 1,
                        position: turn.position,
                        battleTactic: turn.battleTactic,
                        btCompleted: turn.btCompleted,
                        objectivePoints: turn.objectivePoints,
                        victoryPoints: turn.victoryPoints,
                        conceded: turn.conceded,
                      })),
                    },
                  },
                },
                {
                  roundNumber: 4,
                  turns: {
                    createMany: {
                      data: rounds[3].turns.map((turn, turnIndex) => ({
                        teamNumber: turnIndex + 1,
                        position: turn.position,
                        battleTactic: turn.battleTactic,
                        btCompleted: turn.btCompleted,
                        objectivePoints: turn.objectivePoints,
                        victoryPoints: turn.victoryPoints,
                        conceded: turn.conceded,
                      })),
                    },
                  },
                },
                {
                  roundNumber: 5,
                  turns: {
                    createMany: {
                      data: rounds[4].turns.map((turn, turnIndex) => ({
                        teamNumber: turnIndex + 1,
                        position: turn.position,
                        battleTactic: turn.battleTactic,
                        btCompleted: turn.btCompleted,
                        objectivePoints: turn.objectivePoints,
                        victoryPoints: turn.victoryPoints,
                        conceded: turn.conceded,
                      })),
                    },
                  },
                },
              ],
            },
          },
        },
      },
      include: {
        battleReport: true,
      },
    });

    revalidatePath("/");
    return { success: "Result created!" };
  }

  if (existingResult) {
    await db.result.update({
      where: { id: existingResult.id },
      data: {
        winner,
        loser,
        battleReport: {
          update: {
            battlePlan,
          },
        },
      },
      include: {
        battleReport: true,
      },
    });

    rounds.forEach((round) => {
      const rId = xRounds.find((xr) => xr.roundNumber === round.roundNumber).id;

      round.turns.forEach(async (turn) => {
        await db.turn.updateMany({
          where: {
            AND: {
              teamNumber: turn.teamNumber,
            },
            roundId: rId,
          },
          data: {
            teamNumber: turn.teamNumber,
            position: turn.position,
            battleTactic: turn.battleTactic,
            btCompleted: turn.btCompleted,
            objectivePoints: turn.objectivePoints,
            victoryPoints: turn.victoryPoints,
            conceded: turn.conceded,
          },
        });
      });
    });
    revalidatePath("/");
    return { success: "Result updated!" };
  }
};

export default result;
