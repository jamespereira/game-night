import { getTeamsByGameId } from "@/data/team";
import Countdown from "./Countdown";
import TeamTile from "./TeamTile";
import { getUsersByIds } from "@/data/user";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import Image from "next/image";
import { Game, Team } from "@prisma/client";
import { placeholderImage } from "@/utils/placeholder-images";

type Props = {
  game: Game;
};

const GameDetail = async ({ game }: Props) => {
  const teams = await getTeamsByGameId(game.id);

  async function getTeamDetails(teams: Team[], teamNumber: number) {
    const teamUserIds = teams.find(
      (team) => team.teamNumber === teamNumber
    ).users;

    const teamUsers = await getUsersByIds(teamUserIds);
    const teamDetails = {
      teamNumber,
      users: teamUsers,
    };
    return teamDetails;
  }

  function randomImage() {
    const rand = Math.floor(Math.random() * (10 - 1 + 1)) + 1;
    const imageString = `/images/bg_${rand}.jpg`;
    return imageString;
  }

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
              src={randomImage()}
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
          <CardHeader></CardHeader>
          <CardContent className="flex flex-row w-full justify-between items-center">
            <TeamTile
              gameId={game.id}
              teamDetails={await getTeamDetails(teams, 1)}
            />
            <p className="text-3xl text-amber-400 [text-shadow:_0_0_5px_rgb(0_0_0_/_80%)]">
              vs
            </p>
            <TeamTile
              gameId={game.id}
              teamDetails={await getTeamDetails(teams, 2)}
            />
          </CardContent>
          <CardFooter>
            {/* TO DO update team to logged in user */}
            {/* <div className="flex items-center justify-center">
              <Button className="bg-amber-600/75">
                <Link
                  href="/games/[gameId]/teams/[teamId]"
                  as={`/games/${game.id}/teams/1`}
                >
                  Edit Team
                </Link>
              </Button>
            </div> */}
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default GameDetail;
