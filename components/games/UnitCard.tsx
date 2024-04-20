import React from "react";
import UnitImage from "./UnitImage";
import { Unit } from "@prisma/client";
import { FaWindowClose } from "react-icons/fa";

type Props = {
  unit: Unit;
  handleRemoveUnit: (arg0: string) => void;
};
const UnitCard = ({ unit, handleRemoveUnit }: Props) => {
  return (
    <div className="flex flex-row items-center justify-between gap-x-4 p-4 bg-slate-500 rounded-xl shadow-slate-900 shadow-sm">
      <div className="flex flex-row gap-x-2 items-center text-wrap  ">
        <UnitImage unitId={unit.unitId} unitName={unit.name} />
        <span className="text-stone-200">{unit.name}</span>
      </div>
      <div className="flex flex-row gap-x-2">
        <span className="text-stone-200">{`${unit.points}pts`}</span>
        <button className="" onClick={() => handleRemoveUnit(unit.id)}>
          <FaWindowClose className="text-slate-200" />
        </button>
      </div>
    </div>
  );
};

export default UnitCard;
