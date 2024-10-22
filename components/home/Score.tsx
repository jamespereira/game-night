import { ResultDetails } from "@/interfaces";
import React from "react";

type Props = { gameResult: ResultDetails };

function Score({ gameResult }: Props) {
  const rounds = gameResult?.battleReport?.rounds;

  function calculateVictoryPoints(teamNumber) {
    const victoryPoints = rounds?.reduce((total, round) => {
      const teamPoints = round?.turns?.reduce((teamTotal, turn) => {
        if (turn.teamNumber === teamNumber) {
          return teamTotal + turn.victoryPoints;
        }
        return teamTotal;
      }, 0);
      return total + teamPoints;
    }, 0);

    return victoryPoints;
  }

  return (
    <div className="flex flex-col items-center justify-center">
      <p className="text-sm text-white">score</p>
      <p className="text-3xl text-amber-400 font-bold">
        {calculateVictoryPoints(1)} - {calculateVictoryPoints(2)}
      </p>
    </div>
  );
}

export default Score;
