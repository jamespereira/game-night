"use client";

import React, { useState } from "react";
import { Army, User } from "../../interfaces";
import AddUnits from "./AddUnits";
import { FaChevronDown, FaChevronUp, FaWindowClose } from "react-icons/fa";
import UnitImage from "./UnitImage";
import UnitList from "./UnitList";

type ArmyProps = {
  army: Army;
  user: User;
  userFaction: any;
};

const ArmyDetail = ({ army, user, userFaction }: ArmyProps) => {
  const [showList, setShowList] = useState(true);
  const { faction, subfaction } = army;

  const [armyUnits, setArmyUnits] = useState(army.units);

  console.log("army", army);

  function getPointsTotal() {
    const unitPoints = armyUnits.map((unit) => unit.points);
    const totalPoints = unitPoints.reduce((a, c) => a + c, 0);
    return totalPoints;
  }

  function formatUnitObject(unit) {
    const formattedUnit = {
      id: unit._id,
      name: unit._name,
      wounds: unit.profiles.profile
        ?.find((p) => p._typeName.toLowerCase() === "unit")
        ?.characteristics.characteristic?.find(
          (c) => c._name.toLowerCase() === "wounds"
        ).__text,
      unitType: unit.categoryLinks.categoryLink?.find(
        (c) => c._name.toLowerCase() === "hero"
      )
        ? "Leader"
        : "Battleline",
      points: Number(unit.costs?.cost._value) || 100,
    };

    return formattedUnit;
  }

  function onAddUnits(units) {
    const newUnits = units.map((unit) => formatUnitObject(unit));
    setArmyUnits([...armyUnits, ...newUnits]);
  }

  function removeUnit(unitId) {
    setArmyUnits(armyUnits.filter((unit) => unit.id !== unitId));
    return (army.units = armyUnits);
  }

  return (
    <>
      <div className="">
        <div className="flex flex-row justify-between p-8 ">
          <div className="flex flex-row gap-8">
            <button onClick={() => setShowList(!showList)}>
              {showList ? <FaChevronDown /> : <FaChevronUp />}
            </button>
            <div>{user?.name} </div>
            <div>{faction} </div>
            <div>{subfaction}</div>
          </div>
          <div className="flex flex-row gap-8">
            <AddUnits userFaction={userFaction} onAddUnits={onAddUnits} />
            <div>{getPointsTotal()} pts</div>
          </div>
        </div>
        {showList ? (
          <div className="flex flex-row gap-8 p-8">
            <UnitList units={armyUnits} type="Leader" removeUnit={removeUnit} />
            <UnitList
              units={armyUnits}
              type="Battleline"
              removeUnit={removeUnit}
            />
            <UnitList units={armyUnits} type="Other" removeUnit={removeUnit} />
          </div>
        ) : null}
      </div>
    </>
  );
};

export default ArmyDetail;
