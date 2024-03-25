"use client";

import React, { useState } from "react";
import { Army, User } from "../../interfaces";
import AddUnits from "./AddUnits";
import { FaChevronDown, FaChevronUp, FaWindowClose } from "react-icons/fa";
import UnitImage from "./UnitImage";
import UnitList from "./UnitList";
import ArmyList from "./ArmyList";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

type ArmyProps = {
  user: User;
};

const ArmyDetail = ({ user }: ArmyProps) => {
  const [showList, setShowList] = useState(true);
  // const { faction, subfaction } = army;

  const hasArmy = !!user.army;

  const army = { units: [] };
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

  function onRemoveUnit(unitId) {
    setArmyUnits(armyUnits.filter((unit) => unit.id !== unitId));
    return (army.units = armyUnits);
  }

  const [faction, setFaction] = useState("");
  function onChange() {
    console.log("changed");
  }
  console.log("faction", faction);

  return (
    <>
      <div className="">
        <div className="flex flex-row justify-between p-8 ">
          <div className="flex flex-row gap-8">
            <button onClick={() => setShowList(!showList)}>
              {showList ? <FaChevronDown /> : <FaChevronUp />}
            </button>
            <div>{user?.name} </div>
            <div>
              <Select
                // disabled={isPending}
                onValueChange={(e) => setFaction(e)}
                // defaultValue={field.value}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a faction" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={"lumineth"}>Lumineth</SelectItem>
                  <SelectItem value={"UserRole.USER"}>Ork</SelectItem>
                </SelectContent>
              </Select>{" "}
            </div>
            <div>
              <Select
                // disabled={isPending}
                onValueChange={onChange}
                // defaultValue={field.value}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a subfaction" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={"UserRole.ADMIN"}>Lumineth</SelectItem>
                  <SelectItem value={"UserRole.USER"}>Ork</SelectItem>
                </SelectContent>
              </Select>{" "}
            </div>
          </div>
          <div className="flex flex-row gap-8">
            <AddUnits
              userFaction={"lumineth_realm-lords"}
              onAddUnits={onAddUnits}
            />
            <div>{getPointsTotal()} pts</div>
          </div>
        </div>
        {showList ? (
          <ArmyList units={armyUnits} onRemoveUnit={onRemoveUnit} />
        ) : null}
      </div>
    </>
  );
};

export default ArmyDetail;
