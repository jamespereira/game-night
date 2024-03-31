"use server";
import { promises as fs } from "fs";
import { revalidatePath } from "next/cache";

export const getFactionByName = async (faction: string) => {
  try {
    const file = await fs.readFile(
      process.cwd() + `/app/appData/factions/${faction}.json`,
      "utf8"
    );
    console.log("file", file);
    const data = await JSON.parse(file);
    console.log("data", data);

    revalidatePath("/games/");
    return data.catalogue;
  } catch {
    return null;
  }
};
