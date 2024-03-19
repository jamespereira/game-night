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
    <div className="flex max-w-[1176px] flex-col gap-y-8">
      <Countdown />
      <div className="flex w-full flex-row items-center justify-between gap-x-4">
        <TeamTile
          gameId={gameId}
          team={item.teams.filter((team) => team.teamNumber === 1)[0]}
        />
        <p className="text-3xl text-stone-200">vs</p>
        <TeamTile
          gameId={gameId}
          team={item.teams.filter((team) => team.teamNumber === 2)[0]}
        />
      </div>
    </div>
  );
};

export default GameDetail;
