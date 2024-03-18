import GameDetail from "@/components/games/GameDetail";
import { Game } from "@/interfaces";
import { sampleGameData } from "@/utils/sample-game-data";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

function getData() {
  const res: Game[] = sampleGameData;

  return res;
}

const Home = async () => {
  const data = await getData();

  return (
    // min-w-2xl
    <div className="pt-[80px] flex h-full flex-col gap-8 items-center justify-around  bg-stone-800">
      <GameDetail item={data[0]} />
    </div>
  );
};

export default Home;
