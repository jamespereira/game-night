import dayjs from "dayjs";

type Props = {
  game: any;
};
const Countdown = ({ game }: Props) => {
  const timeTo = dayjs().to(game.date);

  return (
    <div className="flex flex-col">
      <p className="mb-2 text-md leading-6 font-semibold text-sky-400">
        {timeTo}
      </p>
      <h1 className="text-2xl sm:text-3xl font-extrabold text-stone-200">
        {dayjs(game.date).format("dddd, MMMM D, h:mm A	")}
      </h1>
      <p className="mt-2 text-lg text-stone-300/85">{game.location}</p>
    </div>
  );
};

export default Countdown;
