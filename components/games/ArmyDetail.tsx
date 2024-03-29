"use client";

import React, { useState } from "react";
import { User } from "../../interfaces";
import AddUnits from "./AddUnits";
import { FaChevronDown, FaChevronUp, FaWindowClose } from "react-icons/fa";
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
import { getPointsTotal } from "@/utils/points-total";
import removeArmyById from "@/actions/remove-army";

type ArmyProps = {
  gameId: number;
  user: User;
  army: any;
  factionList: any;
};

const ArmyDetail = ({ gameId, user, army, factionList }: ArmyProps) => {
  const [showList, setShowList] = useState(true);

  const [faction, setFaction] = useState({
    factionName: army?.faction || "",
    factionList: factionList || null,
  });

  async function onFactionChange(selectedFaction) {
    const faction = await getFactionByName(selectedFaction);
    setFaction({
      factionName: selectedFaction,
      factionList: faction,
    });
  }

  function renderFactionSelect() {
    return (
      <div className="flex flex-row gap-x-4 items-center">
        <Select
          disabled={!!army?.faction}
          onValueChange={(e) => onFactionChange(e)}
          defaultValue={army?.faction}
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

        <button className="" onClick={() => removeArmyById(army.id)}>
          <FaWindowClose className="text-slate-200" />
        </button>
      </div>
    );
  }

  return (
    <div className="bg-slate-700 rounded-md min-w-fit">
      <div className="flex flex-row justify-between p-8 gap-8 flex-wrap">
        <div className="flex flex-row items-center gap-8 flex-wrap">
          <button onClick={() => setShowList(!showList)}>
            {showList ? <FaChevronDown /> : <FaChevronUp />}
          </button>
          <div>
            <p className="text-lg font-semibold">{user?.name}</p>
          </div>
          {renderFactionSelect()}
        </div>
        <div className="flex flex-row gap-8 items-center">
          <AddUnits faction={faction} userId={user.id} gameId={gameId} />
          <div className="font-semibold">
            {army?.units && getPointsTotal(army)} pts
          </div>
        </div>
      </div>
      {showList && army?.units ? <ArmyList units={army?.units} /> : null}
    </div>
  );
};

export default ArmyDetail;
