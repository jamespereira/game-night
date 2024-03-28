"use client";

import React, { useState } from "react";
import { User } from "../../interfaces";
import AddUnits from "./AddUnits";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import ArmyList from "./ArmyList";
import { factionNames } from "@/utils/faction-names";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { getFactionByName } from "@/data/faction";

type ArmyProps = {
  gameId: number;
  user: User;
  army: any;
};

const ArmyDetail = ({ gameId, user, army }: ArmyProps) => {
  const [showList, setShowList] = useState(true);

  const [faction, setFaction] = useState({
    factionName: "",
    factionList: null,
  });

  function getPointsTotal() {
    const unitPoints = army?.units.map((unit) => unit.points);
    const totalPoints = unitPoints.reduce((a, c) => a + c, 0);
    return totalPoints;
  }

  async function onFactionChange(selectedFaction) {
    const faction = await getFactionByName(selectedFaction);
    setFaction({ factionName: selectedFaction, factionList: faction });
  }

  return (
    <div>
      <div className="flex flex-row justify-between p-8 ">
        <div className="flex flex-row items-center gap-8">
          <button onClick={() => setShowList(!showList)}>
            {showList ? <FaChevronDown /> : <FaChevronUp />}
          </button>
          <div>{user.name} </div>
          <div>
            <Select
              // disabled={isPending}
              onValueChange={(e) => onFactionChange(e)}
              // defaultValue={field.value}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select a faction" />
              </SelectTrigger>
              <SelectContent>
                {factionNames?.map((g) => (
                  <SelectGroup key={g.grandAlliance}>
                    <SelectLabel>{g.grandAlliance}</SelectLabel>

                    {g.factions?.map((faction) => (
                      <SelectItem key={faction} value={faction}>
                        {faction.replace(/_/g, " ")}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="flex flex-row gap-8">
          <AddUnits faction={faction} userId={user.id} gameId={gameId} />
          <div>
            {!!army ? getPointsTotal() : null}
            pts
          </div>
        </div>
      </div>
      {showList && army?.units ? <ArmyList units={army?.units} /> : null}
    </div>
  );
};

export default ArmyDetail;
