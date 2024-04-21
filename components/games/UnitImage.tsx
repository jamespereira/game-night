import Image from "next/image";
import React, { Suspense, startTransition, useEffect, useState } from "react";

type Props = {
  unitName: string;
  unitImage?: string;
};

const UnitImage = ({ unitName, unitImage }: Props) => {
  function getFirstLetterAcronym(str) {
    const words = str?.split(/\s+/);
    const firstLetters = words
      ?.filter(
        (word) => word.toLowerCase() !== "the" && word.toLowerCase() !== "of"
      )
      .map((word) => word.slice(0, 1).toUpperCase());
    return firstLetters?.join("");
  }

  return (
    <>
      {!!unitImage ? (
        <div className="flex justify-center items-center rounded-xl text-slate-200 min-w-16 min-h-16 max-h-16 max-w-16 relative overflow-hidden">
          <Image src={unitImage} alt={`${unitName} image`} sizes="100" fill />
        </div>
      ) : (
        <div className="flex justify-center items-center rounded-full bg-sky-700 text-slate-200 p-4 min-w-12 min-h-12 max-h-12 max-w-12 relative overflow-hidden">
          {getFirstLetterAcronym(unitName)}{" "}
        </div>
      )}
    </>
  );
};

export default UnitImage;
