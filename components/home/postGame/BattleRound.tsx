import { RoundDetails } from "@/interfaces";
import { getBattleTacticById } from "@/utils/battle-tactics";
import { Round } from "@prisma/client";
import React from "react";
import { FaFlag } from "react-icons/fa";

type Props = {
  round: RoundDetails;
};

function BattleRound({ round }: Props) {
  function getRoundByTeam(team: number) {
    const teamRound = round.turns.find((turn) => turn.teamNumber === team);
    return teamRound;
  }

  function getVictoryPoints(teamNumber: number) {
    const victoryPoints = getRoundByTeam(teamNumber)?.victoryPoints;
    const conceded = getRoundByTeam(teamNumber)?.conceded;
    return conceded ? (
      <FaFlag className="text-stone-100 md:text-sm text-[10px]" />
    ) : victoryPoints ? (
      victoryPoints
    ) : (
      "-"
    );
  }
  return (
    <div className="text-stone-300/85 flex flex-col gap-1">
      <p className="text-sky-400 font-semibold">Round {round.roundNumber}</p>
      <div className="w-full flex justify-around gap-2">
        <div className="w-1/2 flex justify-end gap-2 capitalize">
          {getRoundByTeam(1)?.position}{" "}
          <div className="w-6 h-6 flex justify-center" />
        </div>
        <div className="w-1/2 flex justify-start gap-2 capitalize">
          <div className="w-6 h-6 flex justify-center" />{" "}
          {getRoundByTeam(2)?.position}
        </div>
      </div>
      <div className="w-full flex justify-around gap-2">
        <div className="w-1/2 flex justify-end gap-2">
          {getBattleTacticById(getRoundByTeam(1)?.battleTactic)}
          <div className="w-6 h-6 flex justify-center items-center bg-slate-900">
            {getRoundByTeam(1)?.btCompleted ? "4" : "-"}
          </div>
        </div>
        <div className="w-1/2 flex justify-start gap-2">
          <div className="w-6 h-6 flex justify-center items-center bg-slate-900">
            {getRoundByTeam(2)?.btCompleted ? "4" : "-"}
          </div>
          {getBattleTacticById(getRoundByTeam(2)?.battleTactic)}
        </div>
      </div>
      <div className="w-full flex justify-around gap-2">
        <div className="w-1/2 flex justify-end gap-2">
          Objectives{" "}
          <div className="w-6 h-6 flex justify-center items-center bg-slate-900">
            {getRoundByTeam(1)?.objectivePoints
              ? getRoundByTeam(1)?.objectivePoints
              : "-"}
          </div>
        </div>
        <div className="w-1/2 flex justify-start gap-2">
          <div className="w-6 h-6 flex justify-center items-center bg-slate-900">
            {getRoundByTeam(2)?.objectivePoints
              ? getRoundByTeam(2)?.objectivePoints
              : "-"}
          </div>{" "}
          Objectives
        </div>
      </div>
      <div className="w-full flex justify-around gap-2">
        <div className="w-1/2 flex justify-end gap-2">
          {getRoundByTeam(1)?.conceded ? "Conceded" : ""}
          <div className="w-6 h-6 flex justify-center items-center bg-slate-900 text-amber-400/85 font-bold">
            {getVictoryPoints(1)}
          </div>{" "}
        </div>
        <div className="w-1/2 flex justify-start gap-2">
          <div className="w-6 h-6 flex justify-center items-center bg-slate-900 text-amber-400/85 font-bold">
            {getVictoryPoints(2)}
          </div>
          {getRoundByTeam(2)?.conceded ? "Conceded" : ""}
        </div>
      </div>
    </div>
  );
}

export default BattleRound;
