import { getTeamByGameIdAndTeamNumber, getTeamsByGameId } from "@/data/team";
import Countdown from "./Countdown";
import TeamTile from "./TeamTile";
import { getAllUsers, getUsersByIds } from "@/data/user";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import Image from "next/image";
import { Game, Team } from "@prisma/client";
import { placeholderImage } from "@/utils/placeholder-images";
import { Button } from "../ui/button";
import Link from "next/link";
import { currentUser } from "@/lib/auth";
import Result from "./Result";
import { getExtendedResultByGameId, getResultByGameId } from "@/data/result";
import RoleGate from "../auth/RoleGate";
import { isBeforeGame } from "@/utils/game-time";
import Remove from "./Remove";
import Edit from "./Edit";
import { GameDetails } from "@/interfaces";

type Props = {
  game: GameDetails;
};

const GameDetail = async ({ game }: Props) => {
  const teams = await getTeamsByGameId(game.id);
  const usersData = await getAllUsers();

  async function getTeamDetails(teamNumber: number) {
    const team = await getTeamByGameIdAndTeamNumber(game.id, teamNumber);

    const teamUsers = await getUsersByIds(team.users);
    const teamId = team.id;
    const teamDetails = {
      teamId,
      teamNumber,
      users: teamUsers,
    };
    return teamDetails;
  }

  function getGameImage(gameId) {
    const imageNumber = gameId.toString().substr(-1);
    const imageString = `/images/bg_${imageNumber}.jpg`;
    return imageString;
  }

  const user = await currentUser();

  const userTeam = teams?.find((team) =>
    team.users?.find((teamUser) => teamUser == user?.id)
  )?.teamNumber;

  const result = await getExtendedResultByGameId(game.id);

  return (
    <div className="flex flex-col gap-y-8 w-full mt-[25%]">
      <div className="flex md:flex-row flex-col gap-x-8 w-full flex-wrap">
        <div className="flex flex-1">
          <Countdown game={game} />
        </div>
        <Card className="flex flex-1 flex-col items-center justify-center gap-x-4 bg-inherit relative border-sky-400 border-2">
          <div className="w-full h-full z-[-2] absolute">
            <div className="w-full h-full z-[1] bg-black/25 absolute"></div>
            <Image
              src={getGameImage(game.id)}
              alt={`aos background image`}
              sizes="100"
              quality={75}
              fill
              priority
              placeholder="blur"
              blurDataURL={placeholderImage()}
              className="object-cover rounded-xl"
            />
          </div>
          <CardHeader>
            {!isBeforeGame(game.date) ? (
              <RoleGate allowedRole="ADMIN">
                <Result teams={teams} gameResult={result} gameId={game.id} />
              </RoleGate>
            ) : null}
            <RoleGate allowedRole="ADMIN">
              <Edit game={game} users={usersData} />
              <Remove gameId={game.id} />
            </RoleGate>
          </CardHeader>
          <CardContent className="flex flex-row w-full justify-between items-center">
            <TeamTile
              gameId={game.id}
              gameDate={game.date}
              teamDetails={await getTeamDetails(1)}
              result={result}
            />
            <p className="text-3xl text-amber-400 [text-shadow:_0_0_5px_rgb(0_0_0_/_80%)]">
              vs
            </p>
            <TeamTile
              gameId={game.id}
              gameDate={game.date}
              teamDetails={await getTeamDetails(2)}
              result={result}
            />
          </CardContent>
          <CardFooter>
            {!!userTeam && isBeforeGame(game.date) ? (
              <div className="flex items-center justify-center">
                <Button className="bg-amber-400/85 [drop-shadow:_0_0_5px_rgb(0_0_0_/_80%)] text-black">
                  <Link
                    href="/games/[gameId]/teams/[teamId]"
                    as={`/games/${game.id}/teams/${userTeam}`}
                  >
                    Update List
                  </Link>
                </Button>
              </div>
            ) : null}
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default GameDetail;
