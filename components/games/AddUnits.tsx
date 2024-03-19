import React from "react";
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

const AddUnits = () => {
  function addUnit(newUnit: Unit) {
    // setArmyUnits([newUnit, ...armyUnits]);
    console.log("new units", newUnit);
  }

  function addUnitsToArmy() {
    // console.log("army", army);
    // armyUnits.forEach((unit) => army.units.push(unit));
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
        <div>
          <Button
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
          </Button>
        </div>
        <DialogFooter>
          <Button onClick={() => addUnitsToArmy()}>Add Unit</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddUnits;
