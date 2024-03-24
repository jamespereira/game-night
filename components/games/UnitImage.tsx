import React from "react";

type Props = {
  name: string;
};

const UnitImage = ({ name }: Props) => {
  function getFirstLetterAcronym(str) {
    const words = str.split(/\s+/);
    const firstLetters = words
      .filter(
        (word) => word.toLowerCase() !== "the" && word.toLowerCase() !== "of"
      )
      .map((word) => word.slice(0, 1).toUpperCase());
    return firstLetters.join("");
  }

  return (
    <div className="flex justify-center items-center rounded-full bg-emerald-800 text-slate-200 p-2 w-12 h-12">
      {getFirstLetterAcronym(name)}
    </div>
  );
};

export default UnitImage;
