import GameDetail from "@/components/home/GameDetail";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { getAllGames, getAllGamesWithTeams } from "@/data/game";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

const Home = async () => {
  const allGames = await getAllGamesWithTeams();

  function stringToDate(date) {
    return new Date(date);
  }

  const sortedGames = allGames?.sort(
    (a, b) => stringToDate(a.date).getTime() - stringToDate(b.date).getTime()
  );

  return (
    <div className="container flex flex-col items-center max-w-8xl mx-auto px-4 sm:px-6 md:px-8">
      {/* {!!allGames?.length ? (
        <Carousel
          className="mt-40"
          orientation="vertical"
          opts={{ axis: "y", slidesToScroll: "auto" }}
        >
          <CarouselContent className="h-[700px]">
            {sortedGames
              ?.map((game) => (
                <CarouselItem key={game.id}>
                  <GameDetail game={game} />
                </CarouselItem>
              ))
              .reverse()}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext>
            <p>Next</p>
          </CarouselNext>
        </Carousel>
      ) : (
        // sortedGames
        //   ?.map((game) => <GameDetail key={game.id} game={game} />)
        //   .reverse()
        <p className="mt-40 text-slate-200 text-2xl font-semibold">
          There are no created games.
        </p>
      )} */}

      {!!allGames?.length ? (
        sortedGames
          ?.map((game) => <GameDetail key={game.id} game={game} />)
          .reverse()
      ) : (
        <p className="mt-40 text-slate-200 text-2xl font-semibold">
          There are no created games.
        </p>
      )}
    </div>
  );
};

export default Home;
