import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { Unit } from "@/interfaces";
import { getFactionByName } from "@/data/faction";

type Props = {
  userFaction: any;
};

const AddUnits = ({ userFaction }: Props) => {
  const [addedUnits, setAddedUnits] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const factionUnits = userFaction.categoryEntries.categoryEntry;

  const searchResults = !searchTerm
    ? factionUnits
    : factionUnits.filter((unit) =>
        unit._name.toLowerCase().includes(searchTerm.toLowerCase())
      );

  function addUnit(newUnit: Unit) {
    // setArmyUnits([newUnit, ...armyUnits]);
    console.log("new units", newUnit);
  }

  function handleAddUnit(unit) {
    setAddedUnits([...addedUnits, unit]);
  }

  function addUnitsToArmy() {
    console.log("faction", userFaction);
    const find = userFaction.categoryEntries.categoryEntry.filter((unit) =>
      unit._name.includes("WIND")
    );
    console.log("find", find);
  }
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Add Units</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Units</DialogTitle>
          <DialogDescription>
            search and add units to your army
          </DialogDescription>
        </DialogHeader>
        <div className="h-[400px] overflow-y-auto">
          <input
            type="text"
            placeholder="Search units"
            value={searchTerm}
            onChange={(e) => handleSearch(e)}
          />
          <ul className="m-y-4">
            {searchResults.map((result) => (
              <li
                key={result._id}
                className="flex flex-row justify-between items-center gap-x-4 m-4"
              >
                {result._name}

                <Button onClick={() => handleAddUnit(result._name)}>Add</Button>
              </li>
            ))}
          </ul>
          <p>Added units:</p>
          <ul>
            {addedUnits.map((unit) => (
              <li key={unit}>{unit}</li>
            ))}
          </ul>

          {/* <Button
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
          </Button> */}
        </div>
        <DialogFooter>
          <Button onClick={() => addUnitsToArmy()}>Add Units</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddUnits;
