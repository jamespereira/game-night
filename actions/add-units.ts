"use server";

import { getArmyByUserIdAndGameId } from "@/data/army";
import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";

const addUnits = async (units, userId: string, gameId: number, faction) => {
  // TO DO verify user is logged in user
  const user = await currentUser();
  const existingArmy = await getArmyByUserIdAndGameId(userId, gameId);
  if (!existingArmy) {
    await db.army.create({
      data: {
        userId,
        units: {
          create: units.map((unit) => unit),
        },
        faction,
        gameId,
      },
    });

    revalidatePath("/games/");
    return { success: "Army created!" };
  }
  // TO DO update army with units
  await db.army.update({
    where: { userId, gameId },
    data: {
      units: {
        create: units.map((unit) => unit),
      },
    },
  });

  // TO DO check upsert if works the same
  // await db.army.upsert({
  //   where: { userId, gameId },
  //   update: {
  //     units: {
  //       create: units.map((unit) => unit),
  //     },
  //   },
  //   create: {
  //     userId,
  //     units: {
  //       create: units.map((unit) => unit),
  //     },
  //     faction,
  //     gameId,
  //   },
  // });

  // revalidatePath("/games/");
  // return { success: "Army updated!" };
};

export default addUnits;
