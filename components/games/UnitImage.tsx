import unitImage from "@/actions/unit-image";
import Image from "next/image";
import React, { Suspense, startTransition, useEffect, useState } from "react";

type Props = {
  unitId: string;
  unitName: string;
};

const UnitImage = ({ unitId, unitName }: Props) => {
  function getFirstLetterAcronym(str) {
    const words = str.split(/\s+/);
    const firstLetters = words
      .filter(
        (word) => word.toLowerCase() !== "the" && word.toLowerCase() !== "of"
      )
      .map((word) => word.slice(0, 1).toUpperCase());
    return firstLetters.join("");
  }

  async function handleClick() {
    const image = await unitImage(unitId, unitName);
    setImageURL(image);
    console.log("clicked", imageURL);
  }

  async function getUnitImage() {
    const imageURL = await unitImage(unitId, unitName);
    return <Image src={imageURL} alt={`${unitName} image`} />;
  }

  const [imageURL, setImageURL] = useState("");

  return (
    <div
      className="flex justify-center items-center rounded-full bg-sky-700 text-slate-200 p-2 min-w-12 min-h-12 max-h-12 max-w-12 relative overflow-hidden"
      onClick={() => handleClick()}
    >
      {/* <Suspense fallback={getFirstLetterAcronym(unitName)}>
        {getUnitImage()}
      </Suspense> */}
      {/* <Suspense fallback={getFirstLetterAcronym(unitName)}> */}
      {/* <Image src={imageUrl} alt={`${unitName} image`} /> */}
      {/* <UnitImage imageURL={imageUrl} unitName={unitName} /> */
      /* </Suspense> */}
      {imageURL !== "" ? (
        <Image
          src={imageURL}
          alt={`${unitName} image`}
          // width={100}
          // height={100}
          sizes="100"
          fill
        />
      ) : (
        getFirstLetterAcronym(unitName)
      )}
      {/* {getFirstLetterAcronym(unitName)} */}
    </div>
  );
};

export default UnitImage;
