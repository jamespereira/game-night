import React from "react";
import ArmyDetail from "@/components/games/ArmyDetail";
import { sampleGameData } from "@//utils/sample-game-data";

type Props = {
  params: { gameId; teamId: string };
};

export async function generateStaticParams() {
  const data = await sampleGameData;

  return data.map((game) => ({
    gameId: game.teams.toString(),
    teamId: game.teams.map((team) => team.id).toString(),
  }));
}

async function getTeam(gameId, teamId) {
  const gameData = await sampleGameData.find((game) => game.id === gameId);
  const teamData = await gameData.teams.find((team) => team.id === teamId);
  return teamData;
}

async function TeamDetail({ params }: Props) {
  const team = await getTeam(params.gameId, params.teamId);

  function getPointsTotal(team) {
    const armyPoints = team.users.map((user) =>
      user.army.units.map((unit) => unit.points)
    );
    const unitPoints = armyPoints.flat();

    const totalPoints = unitPoints.reduce((a, c) => a + c, 0);
    return totalPoints;
  }

  console.log("TeamDetail", team);

  return (
    <div className="flex flex-col bg-stone-200">
      <div className="flex flex-row justify-between">
        <h2>Army List page</h2>
        <div>{getPointsTotal(team)}/2000 pts</div>
      </div>
      <div className="flex flex-col">
        {team.users.map(
          (user) =>
            user.army && (
              <ArmyDetail key={user.id} user={user} army={user.army} />
            )
        )}
      </div>
    </div>
  );
}

export default TeamDetail;
