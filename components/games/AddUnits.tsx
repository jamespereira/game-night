import React, { startTransition, useState } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Button } from "../ui/button";
import addUnits from "@/actions/add-units";
import { Unit } from "@prisma/client";
import { Faction } from "@/interfaces";

type Props = {
  faction: Faction;
  userId: string;
  gameId: number;
};

const AddUnits = ({ faction, userId, gameId }: Props) => {
  const [addedUnits, setAddedUnits] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const { factionName, factionList } = faction;

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const factionUnits =
    factionList?.sharedSelectionEntries?.selectionEntry?.filter(
      (entry) => entry._type === "unit"
    );

  const searchResults = !searchTerm
    ? factionUnits
    : factionUnits?.filter((unit) =>
        unit._name.toLowerCase().includes(searchTerm.toLowerCase())
      );

  function handleAdd(unit) {
    setAddedUnits([...addedUnits, unit]);
    setSearchTerm("");
  }

  function handleRemove(unit) {
    setAddedUnits(addedUnits.filter((added) => added._id !== unit._id));
  }

  function handleAddUnits(unit) {
    onAddUnits(unit);
    setAddedUnits([]);
  }

  function formatUnitObject(unit) {
    const formattedUnit = {
      unitId: unit._id,
      name: unit._name,
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
    startTransition(() => {
      const newUnits: Unit[] = units.map((unit) => formatUnitObject(unit));
      addUnits(newUnits, userId, gameId, factionName);
    });
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button disabled={!factionList} className="bg-amber-600/75">
          Add Units
        </Button>
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
            {searchResults?.map((result) => (
              <li
                key={result._id}
                className="flex flex-row justify-between items-center gap-x-4 p-4 border-t-2 border-y-slate-400"
              >
                {result._name}

                <Button onClick={() => handleAdd(result)}>Add</Button>
              </li>
            ))}
          </ul>
        </div>
        <div className="flex flex-col gap-y-4">
          <p>Added units:</p>
          <ul>
            {addedUnits?.map((unit, i) => (
              <li
                className="flex flex-row justify-between items-center gap-x-4 p-4 border-t-2 border-y-slate-400"
                key={`${unit._id}-${i}`}
              >
                {unit._name}
                <Button onClick={() => handleRemove(unit)}>Remove</Button>
              </li>
            ))}
          </ul>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button onClick={() => handleAddUnits(addedUnits)}>
              Add Units
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddUnits;
