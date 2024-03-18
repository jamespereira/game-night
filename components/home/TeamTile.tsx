import React from "react";
import { Team, User } from "@/interfaces";
import { Card, CardContent, CardHeader } from "../ui/card";
import { cn } from "@/lib/utils";
import Link from "next/link";

type Props = {
  team: Team;
  gameId: string;
};

const TeamTile = ({ team, gameId }: Props) => {
  return (
    <Card
      className={cn(
        team.teamNumber === 1 ? "bg-sky-900" : "bg-red-900",
        "w-1/2",
        "border-stone-500"
      )}
    >
      <Link
        href="/games/[gameId]/teams/[teamId]"
        as={`/games/${gameId}/teams/${team.teamNumber}`}
      >
        <CardHeader>
          <p className="text-xl font-semibold">Team {team.teamNumber}</p>
        </CardHeader>
        <CardContent>
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
