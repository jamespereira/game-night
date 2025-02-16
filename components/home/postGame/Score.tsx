import { RoundDetails } from "@/interfaces";
import { calculateVictoryPoints, checkConceded } from "@/utils/score";
import React from "react";
import { FaFlag } from "react-icons/fa";

type Props = {
  rounds: RoundDetails[];
};

function Score({ rounds }: Props) {
  function checkWin(teamNumber) {
    const otherTeam = teamNumber === 1 ? 2 : 1;
    const win =
      calculateVictoryPoints(teamNumber, rounds) >
        calculateVictoryPoints(otherTeam, rounds) ||
      !checkConceded(teamNumber, rounds);

    return win;
  }

  function renderWhiteFlag(teamNumber) {
    return checkConceded(teamNumber, rounds) ? (
      <FaFlag className="text-stone-100 md:text-sm text-[10px]" />
    ) : (
      <div className="w-[14px]" />
    );
  }

  function getTeamScore(teamNumber) {
    return (
      <>
        {teamNumber === 1 ? renderWhiteFlag(teamNumber) : null}
        <span
          className={
            checkWin(teamNumber) ? "text-amber-400" : "text-stone-300/85"
          }
        >
          {calculateVictoryPoints(teamNumber, rounds)}
        </span>
        {teamNumber === 2 ? renderWhiteFlag(teamNumber) : null}
      </>
    );
  }

  return (
    <>
      {getTeamScore(1)} - {getTeamScore(2)}
    </>
  );
}

export default Score;
