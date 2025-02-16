"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import React, { useState } from "react";
import BattleRound from "./BattleRound";
import { Round } from "@prisma/client";
import { ResultDetails, RoundDetails } from "@/interfaces";
import Score from "./Score";
import { getBattlePlanById } from "@/utils/battle-plans";

type Props = {
  gameResult: ResultDetails;
  team1: any;
  team2: any;
};

function BattleReport({ gameResult, team1, team2 }: Props) {
  const rounds = gameResult?.battleReport?.rounds;

  const [showPlan, setShowPlan] = useState(false);

  function renderBattleplan() {
    return (
      <div className="w-full">
        <Image
          src={`/images/Battleplans/Battleplan_${gameResult?.battleReport?.battlePlan}.webp`}
          alt={getBattlePlanById(gameResult?.battleReport?.battlePlan)}
          layout="responsive"
          width={1051}
          height={700}
        />
      </div>
    );
  }

  function renderBattleReport() {
    return (
      <div className="flex flex-col gap-y-2 overflow-y-auto pt-2 border-t border-slate-400/50">
        <div className="w-full flex justify-around text-stone-200">
          <div className="flex w-full gap-4 items-center">
            <div className="w-1/2 flex justify-end">
              {team1.users?.map((player) => player.name).join(", ")}
            </div>
            <div className="flex gap-2 text-2xl">
              <Score rounds={rounds} />
            </div>
            <div className="w-1/2 flex  justify-start">
              {team2.users?.map((player) => player.name).join(", ")}
            </div>
          </div>
        </div>
        {rounds?.map((round) => (
          <BattleRound key={round.id} round={round} />
        ))}
      </div>
    );
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="sm" className="bg-amber-600/75">
          View Battle Report
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-[#163749] border-sky-400 border-2 max-h-full h-full overflow-auto md:h-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-stone-200">
            Game Recap
          </DialogTitle>
          <DialogDescription className="text-stone-300/85 font-semibold">
            <div
              className="w-full flex gap-2 cursor-pointer"
              onClick={() => setShowPlan(!showPlan)}
            >
              {!showPlan ? (
                <>
                  View Battle Plan:{" "}
                  <span className="text-stone-200">
                    {getBattlePlanById(gameResult?.battleReport?.battlePlan)}
                  </span>
                </>
              ) : (
                <>View Battle Report</>
              )}
            </div>
          </DialogDescription>
        </DialogHeader>
        {showPlan ? renderBattleplan() : renderBattleReport()}
      </DialogContent>
    </Dialog>
  );
}

export default BattleReport;
