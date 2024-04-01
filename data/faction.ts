"use server";
// import { promises as fs } from "fs";
import fs from "fs";
import { revalidatePath } from "next/cache";

export const getFactionByName = async (faction: string) => {
  try {
    const file = await fs.readFileSync(
      process.cwd() + `/app/appData/factions/${faction}.json`,
      "utf8"
    );
    const data = await JSON.parse(file);

    revalidatePath("/games/");
    return data.catalogue;
  } catch {
    return null;
  }
};
