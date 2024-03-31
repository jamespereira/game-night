import React from "react";
import Link from "next/link";
import { User } from "@prisma/client";

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
              className="p-4 bg-amber-400/90 shadow-sm drop-shadow-md"
            >
              <p>{user.name}</p>
            </div>
          ))}
        </div>
      </Link>
    </div>
  );
};

export default TeamTile;
