import dayjs from "dayjs";

export const isBeforeGame = (gameDate) => {
  return dayjs().isBefore(dayjs(gameDate));
};
