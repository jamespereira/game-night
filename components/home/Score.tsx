"use server";
import { getTeamByTeamNumber } from "@/data/team";
import { ResultDetails } from "@/interfaces";
import React from "react";
import { FaFlag } from "react-icons/fa";

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

  function renderFlag(teamNumber) {
    const concededRounds = rounds.map(
      (r) => r.turns.find((t) => t.teamNumber === teamNumber).conceded
    );
    const flag = concededRounds.find((r) => r === true);

    return flag ? (
      <FaFlag className="text-stone-100 text-sm" />
    ) : (
      <div className="w-[14px]" />
    );
  }

  function checkWinner(teamNumber) {
    const otherTeam = teamNumber === 1 ? 2 : 1;
    return (
      <span
        className={
          calculateVictoryPoints(teamNumber) > calculateVictoryPoints(otherTeam)
            ? "text-amber-400"
            : "text-stone-300/85"
        }
      >
        {calculateVictoryPoints(teamNumber)}
      </span>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center">
      <p className="text-sm text-white">score</p>
      <div className="flex flex-row gap-2 text-3xl text-stone-300/85 font-bold">
        {renderFlag(1)}
        {checkWinner(1)} - {checkWinner(2)}
        {renderFlag(2)}
      </div>
    </div>
  );
}

export default Score;
