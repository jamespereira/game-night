import React, { startTransition } from "react";
import removeUnit from "@/actions/remove-unit";
import { Unit } from "@prisma/client";
import UnitCard from "./UnitCard";

type Props = {
  units: Unit[];
  type: string;
  locked: boolean;
};

const UnitList = ({ units, type, locked }: Props) => {
  function handleRemoveUnit(unitId) {
    startTransition(() => {
      removeUnit(unitId);
    });
  }

  return (
    <div className="flex flex-col gap-4 flex-1">
      <div className="font-medium text-sky-400">{type}</div>
      {units
        ?.filter((unit) => unit.unitType === type)
        .map((unit) => (
          <UnitCard
            key={unit.id}
            unit={unit}
            handleRemoveUnit={handleRemoveUnit}
            locked={locked}
          />
        ))}
    </div>
  );
};

export default UnitList;
