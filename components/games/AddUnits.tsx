import React, { Suspense, startTransition, useState } from "react";
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
import { Faction } from "@/interfaces";
import { FaPlusSquare } from "react-icons/fa";
import { v4 as uuidv4 } from "uuid";
import UnitCard from "./UnitCard";
import { getUnitPoints } from "@/utils/points";
import unitImage from "@/actions/unit-image";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import { PulseLoader } from "react-spinners";

type Props = {
  faction: Faction;
  userId: string;
  gameId: number;
  locked: boolean;
};

const AddUnits = ({ faction, userId, gameId, locked }: Props) => {
  const [addedUnits, setAddedUnits] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  const { factionName, factionList } = faction;

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const factionUnits = factionList?.entryLinks?.entryLink?.filter(
    (unit) => !unit?._name?.toLowerCase().includes("battle traits")
  );

  const noDupefactionUnits = removeDuplicateObjects(factionUnits, "_name");

  function removeDuplicateObjects(objects, key) {
    const uniqueObjects = {};
    objects?.forEach((obj) => {
      const keyValue = obj[key];
      if (!uniqueObjects[keyValue]) {
        uniqueObjects[keyValue] = obj;
      }
    });
    return Object?.values(uniqueObjects);
  }

  const searchResults = !searchTerm
    ? noDupefactionUnits
    : noDupefactionUnits?.filter((unit: any) =>
        unit?._name?.toLowerCase().includes(searchTerm.toLowerCase())
      );

  async function handleAdd(unit) {
    setIsLoading(true);
    setAddedUnits([...addedUnits, await formatUnitObject(unit)]);
    setIsLoading(false);
    setSearchTerm("");
  }

  function handleRemoveUnit(unitId) {
    setAddedUnits(addedUnits.filter((added) => added.id !== unitId));
  }

  function handleAddUnits(unit) {
    onAddUnits(unit);
    setAddedUnits([]);
  }

  function getUnitType(unit) {
    if ("categoryLinks" in unit) {
      const isHero = unit?.categoryLinks?.categoryLink?._name
        ?.toLowerCase()
        ?.includes("regimental leader");
      if (!!isHero) {
        return "Hero";
      } else return "Other";
    } else return "Other";
  }

  async function formatUnitObject(unit) {
    const imageUrl = await unitImage(unit._id, unit._name, factionName);
    const formattedUnit = {
      id: uuidv4(),
      unitId: unit._id,
      name: unit._name,
      unitType: getUnitType(unit),
      points: getUnitPoints(unit),
      image: imageUrl,
    };

    return formattedUnit;
  }

  function onAddUnits(units) {
    startTransition(() => {
      addUnits(units, userId, gameId, factionName);
      setIsLoading(false);
    });
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          disabled={!faction.factionList || locked}
          className="bg-amber-600/75"
        >
          Add Units
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-[#163749] border-sky-400 border-2 max-h-full h-full overflow-auto md:h-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-stone-200">
            Add Units
          </DialogTitle>
          <DialogDescription className="text-stone-300/85 font-semibold">
            search and add units to your army
          </DialogDescription>

          <input
            type="text"
            className="w-full rounded-md p-2 bg-slate-600"
            placeholder="Search units"
            value={searchTerm}
            onChange={(e) => handleSearch(e)}
          />
        </DialogHeader>
        <div className="md:h-[400px] overflow-y-auto">
          <ul className="px-4">
            {searchResults?.map((result: any) => (
              <li
                key={result._id}
                className="flex flex-row justify-between items-center gap-x-4 my-4 pb-4 border-slate-400/50 border-b first:border-t-2 first:pt-4 text-stone-300"
              >
                <div className="flex justify-between gap-x-2 w-full">
                  <span>{result._name}</span>
                  <span className="whitespace-nowrap">
                    {getUnitPoints(result)} pts
                  </span>
                </div>

                <Button
                  onClick={() => handleAdd(result)}
                  className="p-0 bg-transparent border- w-8 h-8"
                  disabled={isLoading}
                >
                  <FaPlusSquare className="w-full h-full text-sky-400/75" />
                </Button>
              </li>
            ))}
          </ul>
        </div>
        <div className="flex flex-col gap-y-0 overflow-y-auto pt-2 border-t border-slate-400/50">
          <p className="text-sky-400 font-semibold">Added units:</p>
          <p>{isLoading ? <PulseLoader color="rgb(100,116,139)" /> : null}</p>
          <ul>
            {addedUnits?.map((unit) => (
              <li key={unit.id} className="my-4">
                <Suspense
                  fallback={
                    <SkeletonTheme baseColor="#202020" highlightColor="#444">
                      <Skeleton circle />
                      <Skeleton count={5} height={100} width={100} />
                    </SkeletonTheme>
                  }
                >
                  <UnitCard
                    unit={unit}
                    handleRemoveUnit={handleRemoveUnit}
                    locked={locked}
                  />
                </Suspense>
              </li>
            ))}
          </ul>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button
              onClick={() => handleAddUnits(addedUnits)}
              className="bg-amber-600/75"
              disabled={isLoading}
            >
              Add Units
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddUnits;
