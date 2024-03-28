"use server";

import React from "react";
import { getTeamByGameIdAndTeamNumber } from "@/data/team";
import { getUsersByIds } from "@/data/user";
import UserArmy from "@/components/games/UserArmy";

type Props = {
  params: { gameId: string; teamNumber: string };
};

async function TeamDetail({ params }: Props) {
  const gameId = Number(params.gameId);
  const teamNumber = Number(params.teamNumber);
  const teams = await getTeamByGameIdAndTeamNumber(gameId, teamNumber);

  async function getTeamDetails(users) {
    const teamUsers = await getUsersByIds(users);
    const teamDetails = {
      teamNumber,
      users: teamUsers,
    };
    return teamDetails;
  }

  const teamDetails = await getTeamDetails(teams.users);

  function getPointsTotal(team) {
    const armyPoints = team.users.map((user) =>
      user.army.units.map((unit) => unit.points)
    );
    const unitPoints = armyPoints.flat();

    const totalPoints = unitPoints.reduce((a, c) => a + c, 0);
    return totalPoints;
  }

  return (
    <div className="flex flex-col bg-stone-200">
      <div className="flex flex-row justify-between">
        <h2>Army List page</h2>
        <div>
          {/* {getPointsTotal(team)} */}
          xxx/2000 pts
        </div>
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
