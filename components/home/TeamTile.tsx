import React from "react";
import { Team, User } from "@/interfaces";

type Props = {
  team: Team;
};

const TeamTile = ({ team }: Props) => {
  return (
    <div className="flex flex-col justify-center items-center p-4 bg-green-700">
      <h1>Team {team.teamNumber}</h1>
      <div className="flex flex-row gap-4">
        {team.users?.map((user) => (
          <div key={user.id} className="p-4 bg-green-500">
            <p>{user.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TeamTile;
