import GameDetail from "@/components/home/GameDetail";
import { getAllGames } from "@/data/game";
import { Game } from "@/interfaces";
import { sampleGameData } from "@/utils/sample-game-data";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import Image from "next/image";

dayjs.extend(relativeTime);

const Home = async () => {
  const allGames = await getAllGames();

  function stringToDate(date) {
    return new Date(date);
  }

  const sortedGames = allGames?.sort(
    (a, b) => stringToDate(a.date).getTime() - stringToDate(b.date).getTime()
  );

  return (
    <div className="container flex flex-col gap-y-40 items-center max-w-8xl mx-auto px-4 sm:px-6 md:px-8">
      {!!allGames?.length ? (
        sortedGames
          ?.map((game) => <GameDetail key={game.id} game={game} />)
          .reverse()
      ) : (
        <p>You have no games yet</p>
      )}
    </div>
  );
};

export default Home;
