import React from "react";
import UnitList from "./UnitList";

type Props = {
  onRemoveUnit: (arg0: string) => void;
  units: any;
};
const ArmyList = ({ onRemoveUnit, units }: Props) => {
  return (
    <div className="flex flex-row gap-8 p-8">
      <UnitList units={units} type="Leader" handleRemoveUnit={onRemoveUnit} />
      <UnitList units={units} type="Battleline" handleRemoveUnit={units} />
      <UnitList units={units} type="Other" handleRemoveUnit={onRemoveUnit} />
    </div>
  );
};

export default ArmyList;
