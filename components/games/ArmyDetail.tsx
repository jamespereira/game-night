"use client";

import React, { useState } from "react";
import { Army, Unit, User } from "../../interfaces";
import Modal from "../Modal";

type ArmyProps = {
  army: Army;
  user: User;
};

const ArmyDetail = ({ army, user }: ArmyProps) => {
  const [showList, setShowList] = useState(true);
  const { faction, subfaction, units } = army;

  const [showAddUnitModal, setShowAddUnitModal] = useState(false);
  const [armyUnits, setArmyUnits] = useState(army.units);

  function getPointsTotal() {
    const unitPoints = units.map((unit) => unit.points);
    const totalPoints = unitPoints.reduce((a, c) => a + c, 0);
    return totalPoints;
  }

  function addUnit(newUnit: Unit) {
    setArmyUnits([newUnit, ...armyUnits]);
    console.log("new units", armyUnits);
  }

  function addUnitsToArmy() {
    console.log("army", army);
    armyUnits.forEach((unit) => army.units.push(unit));
    setShowAddUnitModal(false);
  }

  function removeUnit(unitId) {
    console.log("unitId", unitId);
    setArmyUnits(armyUnits.filter((unit) => unit.id !== unitId));
    return (army.units = armyUnits);
  }

  return (
    <>
      <div>
        <div className="flex flex-row justify-between p-8 bg-stone-200">
          <div className="flex flex-row gap-8">
            <button onClick={() => setShowList(!showList)}>
              {showList ? "Hide" : "Show"}
            </button>
            <div>{user?.name} </div>
            <div>{faction} </div>
            <div>{subfaction}</div>
          </div>
          <div className="flex flex-row gap-8">
            <button onClick={() => setShowAddUnitModal(true)}>Add Unit</button>
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
                  <div key={`${unit.id}-${i}`}>
                    {unit.name}
                    <button
                      onClick={() => removeUnit(unit.id)}
                      className="bg-red-400"
                    >
                      X
                    </button>
                  </div>
                ))}
            </div>
            <div className="flex flex-col gap-8">
              <div className="font-bold">Battleline</div>
              {armyUnits
                ?.filter((unit) => unit.unitType === "Battleline")
                .map((unit, i) => (
                  <div key={`${unit.id}-${i}`}>
                    {unit.name}
                    <button
                      onClick={() => removeUnit(unit.id)}
                      className="bg-red-400"
                    >
                      X
                    </button>
                  </div>
                ))}
            </div>
            <div className="flex flex-col gap-8">
              <div className="font-bold">Other</div>
              {armyUnits
                ?.filter((unit) => unit.unitType === "Other")
                .map((unit, i) => (
                  <div key={`${unit.id}-${i}`}>
                    {unit.name}
                    <button
                      onClick={() => removeUnit(unit.id)}
                      className="bg-red-400"
                    >
                      X
                    </button>
                  </div>
                ))}
            </div>
          </div>
        ) : null}
      </div>
      {showAddUnitModal ? (
        <Modal title="Add Units">
          <button
            className="bg-blue-400"
            onClick={() =>
              addUnit({
                id: "10",
                name: "Kairos",
                wounds: 15,
                modelCount: 1,
                unitType: "Leader",
                points: 440,
              })
            }
          >
            Add Kairos
          </button>
          <div className="flex flex-row gap-8">
            <button
              className="bg-slate-400"
              onClick={() => setShowAddUnitModal(false)}
            >
              close
            </button>
            <button className="bg-yellow-600" onClick={() => addUnitsToArmy()}>
              Add Unit
            </button>
          </div>
        </Modal>
      ) : null}
    </>
  );
};

export default ArmyDetail;