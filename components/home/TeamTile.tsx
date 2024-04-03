import React from "react";
import Link from "next/link";
import { User } from "@prisma/client";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { FaUserCircle } from "react-icons/fa";
import { cn } from "@/lib/utils";

type Props = {
  teamDetails: { teamNumber: number; users: User[] };
  gameId: number;
};

const TeamTile = ({ teamDetails, gameId }: Props) => {
  return (
    <div>
      <Link
        href="/games/[gameId]/teams/[teamId]"
        as={`/games/${gameId}/teams/${teamDetails.teamNumber}`}
      >
        <div className="flex flex-col gap-4">
          {teamDetails.users?.map((user) => (
            <div
              key={user.id}
              className="p-4 bg-slate-900 shadow-sm drop-shadow-md flex items-center justify-center flex-col gap-y-2 rounded-md border-2 border-slate-400/50"
            >
              <Avatar className="w-6 h-6">
                <AvatarImage src={user?.image || ""} />
                <AvatarFallback className="text-amber-400/90 bg-color-none">
                  <FaUserCircle className="w-full h-full" />
                </AvatarFallback>
              </Avatar>
              <p
                className={cn(
                  teamDetails.teamNumber === 2
                    ? "text-red-300"
                    : "text-sky-300",
                  "font-medium"
                )}
              >
                {user.name}
              </p>
            </div>
          ))}
        </div>
      </Link>
    </div>
  );
};

export default TeamTile;
