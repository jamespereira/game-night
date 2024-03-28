"use server";

import React from "react";
import { User } from "../../interfaces";
import { getArmyWithUnitsByUserIdAndGameId } from "@/data/army";
import ArmyDetail from "./ArmyDetail";
import { getFactionByName } from "@/data/faction";

type Props = {
  user: User;
  gameId: number;
};

const UserArmy = async ({ user, gameId }: Props) => {
  const army = await getArmyWithUnitsByUserIdAndGameId(user.id, gameId);

  const factionList = await getFactionByName(army?.faction);

  return (
    <ArmyDetail
      gameId={gameId}
      user={user}
      army={army}
      factionList={factionList}
    />
  );
};

export default UserArmy;
