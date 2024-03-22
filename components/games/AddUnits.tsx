import React, { useEffect, useState } from "react";
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
import { Unit } from "@/interfaces";
import { getFactionByName } from "@/data/faction";

type Props = {
  userFaction: any;
  onAddUnits: any;
};

const AddUnits = ({ userFaction, onAddUnits }: Props) => {
  const [addedUnits, setAddedUnits] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const factionUnits =
    userFaction.sharedSelectionEntries.selectionEntry?.filter(
      (entry) => entry._type === "unit"
    );

  const searchResults = !searchTerm
    ? factionUnits
    : factionUnits.filter((unit) =>
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
            {addedUnits.map((unit) => (
              <li
                className="flex flex-row justify-between items-center gap-x-4 p-4 border-t-2 border-y-slate-400"
                key={unit._id}
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
