import React from "react";
import { Team, User } from "@/interfaces";
import { Card, CardContent, CardHeader } from "../ui/card";
import { cn } from "@/lib/utils";
import Link from "next/link";
import Image from "next/image";
import { getUserById } from "@/data/user";
import { getTeamByTeamNumber } from "@/data/team";

type Props = {
  teamDetails: any;
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
              className="p-4 bg-amber-400/90 border-white border-2"
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
