"use server";

import React from "react";
import { User } from "../../interfaces";
import { getArmyWithUnitsByUserIdAndGameId } from "@/data/army";
import ArmyDetail from "./ArmyDetail";

type Props = {
  user: User;
  gameId: number;
};

const UserArmy = async ({ user, gameId }: Props) => {
  const army = await getArmyWithUnitsByUserIdAndGameId(user.id, gameId);

  return <ArmyDetail gameId={gameId} user={user} army={army} />;
};

export default UserArmy;
