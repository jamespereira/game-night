"use server";

import React from "react";
import { getTeamByGameIdAndTeamNumber } from "@/data/team";
import { getUsersByIds } from "@/data/user";
import UserArmy from "@/components/games/UserArmy";
import { getArmyWithUnitsByUserIdAndGameId } from "@/data/army";
import { getPointsTotal } from "@/utils/points-total";

type Props = {
  params: { gameId: string; teamNumber: string };
};

async function TeamDetail({ params }: Props) {
  const gameId = Number(params.gameId);
  const teamNumber = Number(params.teamNumber);
  const team = await getTeamByGameIdAndTeamNumber(gameId, teamNumber);

  async function getTeamDetails(users) {
    const teamUsers = await getUsersByIds(users);
    const teamDetails = {
      teamNumber,
      users: teamUsers,
    };
    return teamDetails;
  }

  const teamDetails = await getTeamDetails(team.users);

  async function getTeamPointsTotal(team) {
    let teamTotal = 0;

    for (const user of team) {
      const armyPromise = await getArmyWithUnitsByUserIdAndGameId(user, gameId);
      const army = await armyPromise;
      teamTotal += getPointsTotal(army);
    }
    return teamTotal;
  }

  return (
    <div className="flex flex-col bg-stone-200">
      <div className="flex flex-row justify-between">
        <h2>Army List page</h2>
        <div>{await getTeamPointsTotal(team?.users)}/2000 pts</div>
      </div>
      <div className="flex flex-col">
        {teamDetails.users.map((user: any) => (
          <UserArmy key={user.id} user={user} gameId={gameId} />
        ))}
      </div>
    </div>
  );
}

export default TeamDetail;
