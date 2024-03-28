"use server";
import { promises as fs } from "fs";

export const getFactionByName = async (faction: string) => {
  try {
    const file = await fs.readFile(
      process.cwd() + `/utils/factions/${faction}.json`,
      "utf8"
    );
    const data = JSON.parse(file);
    return data.catalogue;
  } catch {
    return null;
  }
};
