import React from "react";
import { Team, User } from "@/interfaces";
import { Card, CardContent, CardHeader } from "../ui/card";
import { cn } from "@/lib/utils";

type Props = {
  team: Team;
};

const TeamTile = ({ team }: Props) => {
  return (
    <Card className={cn(team.teamNumber === 1 ? "bg-sky-900" : "bg-red-900")}>
      <CardHeader>
        <p>Team {team.teamNumber}</p>
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
    </Card>
  );
};

export default TeamTile;
