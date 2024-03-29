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
    <div className="flex flex-col gap-8 flex-1">
      <div className="font-medium text-sky-400">{type}</div>
      {units
        ?.filter((unit) => unit.unitType === type)
        .map((unit, i) => (
          <div
            key={`${unit.id}-${i}`}
            className="flex flex-row items-center justify-between gap-x-4 p-2 bg-slate-600 rounded-xl shadow-slate-900 shadow-sm"
          >
            <div className="flex flex-row gap-x-2 items-center text-wrap  ">
              <UnitImage name={unit.name} />
              <span className="text-stone-300/90">{unit.name}</span>
            </div>
            <div className="flex flex-row gap-x-2">
              <span>{`${unit.points}pts`}</span>
              <button className="" onClick={() => handleRemoveUnit(unit.id)}>
                <FaWindowClose className="text-slate-200" />
              </button>
            </div>
          </div>
        ))}
    </div>
  );
};

export default UnitList;
