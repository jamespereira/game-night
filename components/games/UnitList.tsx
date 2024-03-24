import React from "react";
import UnitImage from "./UnitImage";
import { FaWindowClose } from "react-icons/fa";

type Props = {
  units: any;
  type: string;
  removeUnit: (arg0: string) => void;
};

const UnitList = ({ units, type, removeUnit }: Props) => {
  return (
    <div className="flex flex-col gap-8">
      <div className="font-bold">Leader</div>
      {units
        ?.filter((unit) => unit.unitType === type)
        .map((unit, i) => (
          <div
            key={`${unit.id}-${i}`}
            className="flex flex-row gap-x-2 items-center border-1 border-slate-200"
          >
            <UnitImage name={unit.name} />
            {unit.name}
            <button onClick={() => removeUnit(unit.id)}>
              <FaWindowClose className="text-red-400" />
            </button>
          </div>
        ))}
    </div>
  );
};

export default UnitList;
