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

export const getTeamByGameIdAndTeamNumber = async (
  gameId: number,
  teamNumber: number
) => {
  try {
    const team = await db.team.findFirst({
      where: { gameId, teamNumber },
    });

    return team;
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

export const getAllTeams = async () => {
  try {
    const teams = await db.team.findMany();
    return teams;
  } catch {
    return null;
  }
};
