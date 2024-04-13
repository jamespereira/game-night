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
    <div className="flex justify-center items-center rounded-full bg-sky-700 text-slate-200 p-2 min-w-12 min-h-12 max-h-12 max-w-12">
      {getFirstLetterAcronym(name)}
    </div>
  );
};

export default UnitImage;
