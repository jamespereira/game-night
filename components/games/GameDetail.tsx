import { GetStaticProps } from "next";
import Link from "next/link";

import { Game } from "../../interfaces";
import Countdown from "../home/Countdown";
import TeamTile from "../home/TeamTile";

type Props = {
  item: Game;
};

const GameDetail = ({ item }: Props) => {
  const gameId = item.id;

  return (
    <>
      <Countdown />
      <div className="flex flex-row items-center justify-between max-w-2xl">
        <Link
          href="/games/[gameId]/teams/[teamId]"
          as={`/games/${gameId}/teams/1`}
        >
          <TeamTile
            team={item.teams.filter((team) => team.teamNumber === 1)[0]}
          />
        </Link>
        <p className="text-3xl">vs</p>
        <Link
          href="/games/[gameId]/teams/[teamId]"
          as={`/games/${gameId}/teams/2`}
        >
          <TeamTile
            team={item.teams.filter((team) => team.teamNumber === 2)[0]}
          />
        </Link>
      </div>
    </>
  );
};

export default GameDetail;
