import React, { useEffect, useState } from "react";
import uniqueId from "lodash";
import dayjs from "dayjs";

const Countdown = () => {
  const event = {
    id: uniqueId(),
    location: "123 Fake st",
    date: "2024-03-10T18:30:00",
    time: "18:30",
  };

  const timeTo = dayjs().to(event.date);

  return (
    <div className="flex flex-row gap-16">
      <div className="flex flex-col">
        <p className="text-3xl">
          {dayjs(event.date).format("dddd, MMMM D, YYYY h:mm A	")}
        </p>
        <p className="text-xl">
          @ {event.location} {event.time}
        </p>
      </div>
      <div>
        <p className="text-3xl">{timeTo}</p>
      </div>
    </div>
  );
};

export default Countdown;
