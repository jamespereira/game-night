"use client";

import React, { useState } from "react";
import { Army, Unit, User } from "../../interfaces";
import { Button } from "../ui/button";
import AddUnits from "./AddUnits";
import {
  FaCheckCircle,
  FaChevronDown,
  FaChevronUp,
  FaCross,
  FaStopCircle,
  FaWindowClose,
} from "react-icons/fa";

type ArmyProps = {
  army: Army;
  user: User;
  userFaction: any;
};

const ArmyDetail = ({ army, user, userFaction }: ArmyProps) => {
  const [showList, setShowList] = useState(true);
  const { faction, subfaction, units } = army;

  const [armyUnits, setArmyUnits] = useState(army.units);

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
            <div className="flex flex-col gap-8">
              <div className="font-bold">Leader</div>
              {armyUnits
                ?.filter((unit) => unit.unitType === "Leader")
                .map((unit, i) => (
                  <div
                    key={`${unit.id}-${i}`}
                    className="flex flex-row gap-x-2"
                  >
                    {unit.name}
                    <button onClick={() => removeUnit(unit.id)}>
                      <FaWindowClose className="text-red-400" />
                    </button>
                  </div>
                ))}
            </div>
            <div className="flex flex-col gap-8">
              <div className="font-bold">Battleline</div>
              {armyUnits
                ?.filter((unit) => unit.unitType === "Battleline")
                .map((unit, i) => (
                  <div
                    key={`${unit.id}-${i}`}
                    className="flex flex-row gap-x-2"
                  >
                    {unit.name}
                    <button onClick={() => removeUnit(unit.id)}>
                      <FaWindowClose className="text-red-400" />
                    </button>
                  </div>
                ))}
            </div>
            <div className="flex flex-col gap-8">
              <div className="font-bold">Other</div>
              {armyUnits
                ?.filter((unit) => unit.unitType === "Other")
                .map((unit, i) => (
                  <div
                    key={`${unit.id}-${i}`}
                    className="flex flex-row gap-x-2"
                  >
                    {unit.name}
                    <button onClick={() => removeUnit(unit.id)}>
                      <FaWindowClose className="text-red-400" />
                    </button>
                  </div>
                ))}
            </div>
          </div>
        ) : null}
      </div>
    </>
  );
};

export default ArmyDetail;
