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
    <Card className="w-[600px] h-[400px] border-stone-500 relative">
      <Image
        src={`/aos_bg_${teamDetails.teamNumber === 1 ? "left" : "right"}.jpg`}
        alt={`Team ${teamDetails.teamNumber} background image`}
        sizes="100"
        fill
        priority
        style={{ objectFit: "cover", zIndex: 0, borderRadius: "0.75rem" }}
      />
      <Link
        href="/games/[gameId]/teams/[teamId]"
        as={`/games/${gameId}/teams/${teamDetails.teamNumber}`}
      >
        <CardHeader className="relative">
          <p className="text-xl font-semibold text-center text-white">
            Team {teamDetails.teamNumber}
          </p>
        </CardHeader>
        <CardContent className="relative">
          <div className="flex flex-row gap-4">
            {teamDetails.users?.map((user) => (
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
