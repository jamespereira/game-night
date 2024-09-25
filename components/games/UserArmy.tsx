"use server";

import React from "react";
import { getArmyWithUnitsByUserIdAndGameId } from "@/data/army";
import ArmyDetail from "./ArmyDetail";
import { getFactionByName } from "@/data/faction";
import { User } from "@prisma/client";

type Props = {
  user: User;
  gameId: number;
  gameDate: string;
};

const UserArmy = async ({ user, gameId, gameDate }: Props) => {
  const army = await getArmyWithUnitsByUserIdAndGameId(user.id, gameId);

  const factionList = await getFactionByName(army?.faction);

  return (
    <ArmyDetail
      gameId={gameId}
      user={user}
      army={army}
      factionList={factionList}
      gameDate={gameDate}
    />
  );
};

export default UserArmy;
