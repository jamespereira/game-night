"use server";

import { getArmyByUserIdAndGameId } from "@/data/army";
import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { Unit } from "@prisma/client";
import { revalidatePath } from "next/cache";

const addUnits = async (
  units: Unit[],
  userId: string,
  gameId: number,
  factionName: string
) => {
  // TO DO verify user is logged in user
  // const user = await currentUser();
  const existingArmy = await getArmyByUserIdAndGameId(userId, gameId);

  if (!existingArmy) {
    await db.army.create({
      data: {
        userId,
        units: {
          create: units.map((unit) => unit),
        },
        faction: factionName,
        gameId,
      },
    });

    revalidatePath("/games/");
    return { success: "Army created!" };
  }

  await db.army.update({
    where: { id: existingArmy.id },
    data: {
      units: {
        create: units.map((unit: Unit) => unit),
      },
    },
  });

  revalidatePath("/games/");
  return { success: "Army updated!" };
};

export default addUnits;
