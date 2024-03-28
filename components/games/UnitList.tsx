import React, { startTransition } from "react";
import UnitImage from "./UnitImage";
import { FaWindowClose } from "react-icons/fa";
import removeUnit from "@/actions/remove-unit";

type Props = {
  units: any;
  type: string;
};

const UnitList = ({ units, type }: Props) => {
  function handleRemoveUnit(unitId) {
    startTransition(() => {
      removeUnit(unitId);
    });
  }

  return (
    <div className="flex flex-col gap-8">
      <div className="font-bold">{type}</div>
      {units
        ?.filter((unit) => unit.unitType === type)
        .map((unit, i) => (
          <div
            key={`${unit.id}-${i}`}
            className="flex flex-row items-center justify-between gap-x-4 border-1 border-slate-200"
          >
            <div className="flex flex-row gap-x-2 items-center text-wrap ">
              <UnitImage name={unit.name} />
              <span>{unit.name}</span>
            </div>
            <div className="flex flex-row gap-x-2">
              <span>{`${unit.points}pts`}</span>
              <button className="" onClick={() => handleRemoveUnit(unit.id)}>
                <FaWindowClose className="text-red-400" />
              </button>
            </div>
          </div>
        ))}
    </div>
  );
};

export default UnitList;
