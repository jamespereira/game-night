import GameDetail from "@/components/home/GameDetail";
import { getAllGames } from "@/data/game";
import { Game } from "@/interfaces";
import { sampleGameData } from "@/utils/sample-game-data";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

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
    // min-w-2xl
    <div className="pt-[80px] flex h-full flex-col gap-8 items-center">
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
