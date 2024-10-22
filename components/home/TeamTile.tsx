import React from "react";
import Link from "next/link";
import { Result, User } from "@prisma/client";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { FaTrophy, FaUserCircle } from "react-icons/fa";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import RoleGate from "../auth/RoleGate";
import dayjs from "dayjs";
import { isBeforeGame } from "@/utils/game-time";
import { currentUser } from "@/lib/auth";

type Props = {
  teamDetails: { teamNumber: number; users: User[]; teamId: string };
  gameDate: string;
  gameId: number;
  result: Result;
};

const TeamTile = async ({ teamDetails, gameId, gameDate, result }: Props) => {
  const user = await currentUser();
  return (
    <div className="flex flex-col gap-4">
      {result?.winner === teamDetails.teamId ? (
        <div className="flex flex-col items-center justify-center">
          <FaTrophy className="w-12 h-12 text-amber-400" />
          <p className="text-amber-400 font-bold">Victory</p>
        </div>
      ) : null}
      {result?.loser === teamDetails.teamId ? (
        <div className="flex flex-col items-center justify-center h-[72px]" />
      ) : null}
      {teamDetails.users?.map((user) => (
        <div
          key={user.id}
          className={cn(
            "p-4 bg-slate-900 shadow-sm drop-shadow-md flex items-center justify-center flex-col gap-y-2 rounded-md border-2",
            teamDetails.teamNumber === 2
              ? "border-rose-400/25"
              : "border-cyan-400/25"
          )}
        >
          {/* <Avatar className="w-6 h-6">
            <AvatarImage src={user?.image || ""} />
            <AvatarFallback className="text-amber-400/90 bg-color-none">
              <FaUserCircle className="w-full h-full" />
            </AvatarFallback>
          </Avatar> */}
          <p
            className={cn(
              teamDetails.teamNumber === 2 ? "text-rose-400" : "text-cyan-400",
              "font-medium"
            )}
          >
            {user.name}
          </p>
        </div>
      ))}
      <RoleGate allowedRole="ADMIN">
        <Button className="bg-sky-400 [drop-shadow:_0_0_5px_rgb(0_0_0_/_80%)] text-black">
          <Link
            href="/games/[gameId]/teams/[teamId]"
            as={`/games/${gameId}/teams/${teamDetails.teamNumber}`}
          >
            Edit Team
          </Link>
        </Button>
      </RoleGate>
      {!isBeforeGame(gameDate) && user ? (
        <Button className="bg-sky-400 [drop-shadow:_0_0_5px_rgb(0_0_0_/_80%)] text-black">
          <Link
            href="/games/[gameId]/teams/[teamId]"
            as={`/games/${gameId}/teams/${teamDetails.teamNumber}`}
          >
            View List
          </Link>
        </Button>
      ) : null}
    </div>
  );
};

export default TeamTile;
