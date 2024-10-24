"use server";
import { getTeamByTeamNumber } from "@/data/team";
import { ResultDetails } from "@/interfaces";
import React from "react";
import { FaFlag, FaTrophy } from "react-icons/fa";

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

  function checkConceded(teamNumber) {
    const concededRounds = rounds.map(
      (r) => r.turns.find((t) => t.teamNumber === teamNumber).conceded
    );
    return concededRounds.find((r) => r === true);
  }

  function checkWin(teamNumber) {
    const otherTeam = teamNumber === 1 ? 2 : 1;
    const win =
      calculateVictoryPoints(teamNumber) > calculateVictoryPoints(otherTeam) ||
      !checkConceded(teamNumber);

    return win;
  }

  function renderFlag(teamNumber) {
    return checkConceded(teamNumber) ? (
      <FaFlag className="text-stone-100 md:text-sm text-[10px]" />
    ) : (
      <div className="w-[14px]" />
    );
  }

  function renderWinner(teamNumber) {
    const otherTeam = teamNumber === 1 ? 2 : 1;
    const win =
      calculateVictoryPoints(teamNumber) > calculateVictoryPoints(otherTeam) ||
      !checkConceded(teamNumber);
    return (
      <>
        {teamNumber === 1 ? renderFlag(teamNumber) : null}
        <span
          className={
            checkWin(teamNumber) ? "text-amber-400" : "text-stone-300/85"
          }
        >
          {calculateVictoryPoints(teamNumber)}
        </span>
        {teamNumber === 2 ? renderFlag(teamNumber) : null}
      </>
    );
  }

  function renderTrophy(teamNumber) {
    return (
      <div className="flex flex-col items-center justify-center min-w-20">
        {checkWin(teamNumber) ? (
          <FaTrophy className="md:w-12 md:h-12 w-8 h-8 text-amber-400" />
        ) : (
          <div className="w-12 mr-8" />
        )}
      </div>
    );
  }

  return (
    <div className="flex flex-row w-full justify-between">
      {renderTrophy(1)}
      <div className="flex flex-col items-center justify-center [text-shadow:_0_0_5px_rgb(0_0_0_/_80%)]">
        <p className="text-sm text-white">score</p>
        <div className="flex flex-row md:gap-2 gap-1 md:text-3xl text-xl text-stone-300/85 font-bold">
          {renderWinner(1)} - {renderWinner(2)}
        </div>
      </div>
      {renderTrophy(2)}
    </div>
  );
}

export default Score;
