import React from "react";
import { Team, User } from "@/interfaces";
import { Card, CardContent, CardHeader } from "../ui/card";
import { cn } from "@/lib/utils";
import Link from "next/link";
import Image from "next/image";

type Props = {
  team: Team;
  gameId: string;
};

const TeamTile = ({ team, gameId }: Props) => {
  return (
    <Card className="w-[600px] h-[400px] border-stone-500 relative">
      <Image
        src={`/aos_bg_${team.teamNumber === 1 ? "left" : "right"}.jpg`}
        alt={`Team ${team.teamNumber} background image`}
        fill
        style={{ objectFit: "cover", zIndex: 0, borderRadius: "0.75rem" }}
      />
      <Link
        href="/games/[gameId]/teams/[teamId]"
        as={`/games/${gameId}/teams/${team.teamNumber}`}
      >
        <CardHeader className="relative">
          <p className="text-xl font-semibold text-center text-white">
            Team {team.teamNumber}
          </p>
        </CardHeader>
        <CardContent className="relative">
          <div className="flex flex-row gap-4">
            {team.users?.map((user) => (
              <div key={user.id} className="p-4 bg-amber-400">
                <p>{user.name}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Link>
    </Card>
  );
};

export default TeamTile;
