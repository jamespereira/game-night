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
    <div className="flex h-full flex-col text-stone-200 pb-8 bg-gradient-to-r from-black/90 from-20% to-sky-900/75 px-4 sm:px-6 md:px-8">
      <div className="flex flex-row justify-between mx-4 py-4 ">
        <h2 className="text-2xl font-semibold">Team {team?.teamNumber} List</h2>
        <h3 className="text-2xl font-semibold text-sky-400">
          {await getTeamPointsTotal(team?.users)}/2000 pts
        </h3>
      </div>
      <div className="flex flex-col mx-4 gap-8">
        {teamDetails.users.map((user: any) => (
          <UserArmy key={user.id} user={user} gameId={gameId} />
        ))}
      </div>
    </div>
  );
}

export default TeamDetail;
