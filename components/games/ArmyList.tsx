import React from "react";
import UnitList from "./UnitList";
import { Unit } from "@prisma/client";

type Props = {
  units: Unit[];
};
const ArmyList = ({ units }: Props) => {
  return (
    <div className="flex flex-row gap-8 p-8 flex-wrap">
      <UnitList units={units} type="Leader" />
      <UnitList units={units} type="Battleline" />
      <UnitList units={units} type="Other" />
    </div>
  );
};

export default ArmyList;
