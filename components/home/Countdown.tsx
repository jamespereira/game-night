import React, { useEffect, useState } from "react";
import uniqueId from "lodash";
import dayjs from "dayjs";

type Props = {
  game: any;
};
const Countdown = ({ game }: Props) => {
  const timeTo = dayjs().to(game.date);

  return (
    <div className="flex flex-row gap-16 text-stone-200">
      <div className="flex flex-col">
        <p className="text-2xl">
          {dayjs(game.date).format("dddd, MMMM D, YYYY h:mm A	")}
        </p>
        <p className="text-xl">
          @ {game.location} {game.time}
        </p>
      </div>
      <div>
        <p className="text-2xl">{timeTo}</p>
      </div>
    </div>
  );
};

export default Countdown;
