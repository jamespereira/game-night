import React from "react";
import UnitList from "./UnitList";
import { Unit } from "@prisma/client";

type Props = {
  units: Unit[];
  locked: boolean;
};
const ArmyList = ({ units, locked }: Props) => {
  return (
    <div className="flex flex-row gap-8 p-8 flex-wrap">
      <UnitList units={units} type="Hero" locked={locked} />
      <UnitList units={units} type="Other" locked={locked} />
    </div>
  );
};

export default ArmyList;
