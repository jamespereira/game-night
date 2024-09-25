"use server";

import React, { Suspense } from "react";
import { getTeamByGameIdAndTeamNumber } from "@/data/team";
import { getUsersByIds } from "@/data/user";
import UserArmy from "@/components/games/UserArmy";
import { getArmyWithUnitsByUserIdAndGameId } from "@/data/army";
import { getPointsTotal } from "@/utils/points";
import { User } from "@prisma/client";
import { getGameById } from "@/data/game";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import { currentRole, currentUser } from "@/lib/auth";

type Props = {
  params: { gameId: string; teamNumber: string };
};

async function TeamDetail({ params }: Props) {
  const user = await currentUser();
  const role = await currentRole();

  const gameId = Number(params.gameId);
  const teamNumber = Number(params.teamNumber);
  const team = await getTeamByGameIdAndTeamNumber(gameId, teamNumber);

  const game = await getGameById(gameId);
  const gamePointsTotal = game.pointsLimit;
  const gameDate = game.date;

  async function getTeamDetails(users: string[]) {
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
      if (army === null) {
        return (teamTotal += 0);
      }
      teamTotal += getPointsTotal(army);
    }

    return teamTotal;
  }

  const teamPointsTotal = await getTeamPointsTotal(team?.users);

  const pointsExceed = teamPointsTotal > gamePointsTotal;

  function renderTeamPoints() {
    return (
      <>
        <span className={pointsExceed ? "text-red-500/90" : "text-stone-200"}>
          {teamPointsTotal}
        </span>
        /{gamePointsTotal} pts
      </>
    );
  }

  function checkUserTeam() {
    const userFound = team.users?.find((teamUser) => teamUser == user?.id);
    const userAdmin = role === "ADMIN";
    return !!userFound || userAdmin;
  }

  return (
    <div className="container flex flex-col max-w-screen-xl mx-auto px-4 sm:px-6 md:px-8 h-full  text-stone-200 pb-8 ">
      {checkUserTeam() ? (
        <>
          <div className="flex flex-row justify-between mx-4 py-4 ">
            <h2 className="text-2xl font-semibold">
              Team {team?.teamNumber} List
            </h2>
            <h3 className="text-2xl font-semibold text-sky-400">
              {renderTeamPoints()}
            </h3>
          </div>
          <div className="flex flex-col mx-4 gap-8">
            {teamDetails.users.map((user: User) => (
              <Suspense
                key={user.id}
                fallback={
                  <SkeletonTheme baseColor="#202020" highlightColor="#444">
                    <Skeleton count={5} height={100} width={100} />
                  </SkeletonTheme>
                }
              >
                <UserArmy
                  key={user.id}
                  user={user}
                  gameId={gameId}
                  gameDate={gameDate}
                />
              </Suspense>
            ))}
          </div>
        </>
      ) : (
        <div className="flex flex-row justify-center mx-4 py-8 ">
          <p>You do not have permission to view this page.</p>
        </div>
      )}
    </div>
  );
}

export default TeamDetail;
