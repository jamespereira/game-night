import React from "react";
import UnitImage from "./UnitImage";
import { Unit } from "@prisma/client";
import { FaWindowClose } from "react-icons/fa";

type Props = {
  unit: Unit;
  handleRemoveUnit: (arg0: string) => void;
  locked: boolean;
};
const UnitCard = ({ unit, handleRemoveUnit, locked }: Props) => {
  return (
    <div className="flex flex-row items-center justify-between gap-x-4 p-1 pr-4 bg-slate-500 rounded-xl shadow-slate-900 shadow-sm">
      <div className="flex flex-row gap-x-4 items-center text-wrap  ">
        <UnitImage unitName={unit.name} unitImage={unit?.image} />
        <span className="text-stone-200 font-medium">{unit.name}</span>
      </div>
      <div className="flex flex-row gap-x-2">
        <span className="text-stone-200">{`${unit.points}pts`}</span>
        {!locked ? (
          <button
            className="buttonRemove"
            onClick={() => handleRemoveUnit(unit.id)}
          >
            <FaWindowClose className="text-slate-200" />
          </button>
        ) : null}
      </div>
    </div>
  );
};

export default UnitCard;
