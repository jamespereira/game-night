import { db } from "@/lib/db";

export const getTeamsByGameId = async (gameId: number) => {
  try {
    const teams = await db.team.findMany({
      where: { gameId },
    });

    return teams;
  } catch {
    return null;
  }
};

export const getTeamByTeamNumber = async (teamNumber: number) => {
  try {
    const team = await db.team.findFirst({
      where: { teamNumber },
    });

    return team;
  } catch {
    return null;
  }
};

export const getUsersByGameId = async (gameId: number) => {
  try {
    const users = await db.team.findMany({
      where: { gameId },
    });

    return users;
  } catch {
    return null;
  }
};
