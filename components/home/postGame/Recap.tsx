"use server";
import { getTeamByTeamNumber } from "@/data/team";
import { ResultDetails } from "@/interfaces";
import React from "react";
import { FaFlag, FaTrophy } from "react-icons/fa";
import BattleReport from "./BattleReport";
import Score from "./Score";
import { calculateVictoryPoints, checkConceded } from "@/utils/score";

type Props = { gameResult: ResultDetails; team1: any; team2: any };

function Recap({ gameResult, team1, team2 }: Props) {
  const rounds = gameResult?.battleReport?.rounds;

  function checkWin(teamNumber) {
    const otherTeam = teamNumber === 1 ? 2 : 1;
    const win =
      calculateVictoryPoints(teamNumber, rounds) >
        calculateVictoryPoints(otherTeam, rounds) ||
      !checkConceded(teamNumber, rounds);

    return win;
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
      <div className="flex flex-col gap-y-2 items-center justify-center [text-shadow:_0_0_5px_rgb(0_0_0_/_80%)]">
        <p className="text-sm text-white">score</p>
        <div className="flex flex-row md:gap-2 gap-1 md:text-3xl text-xl text-stone-300/85 font-bold">
          <Score rounds={rounds} />
        </div>
        <BattleReport gameResult={gameResult} team1={team1} team2={team2} />
      </div>
      {renderTrophy(2)}
    </div>
  );
}

export default Recap;
