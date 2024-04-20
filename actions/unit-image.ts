"use server";

import { getUnitImageById } from "@/data/unit-image";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";

async function getImage(unitName) {
  const serpApiKey = "66223d5e7572c5642ca341ee";

  const unitPrefix = "https://www.warhammer.com/";
  const imageQuery = unitName;

  const res = await fetch(
    `https://api.serpdog.io/images?api_key=${serpApiKey}&q=${
      unitPrefix + imageQuery
    }&gl=us`
  );

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

const unitImage = async (unitId: string, unitName: string) => {
  // if image doesnt exist in DB
  const existingUnitImage = await getUnitImageById(unitId);

  if (!existingUnitImage) {
    // search image API
    const imageResults = await getImage(unitName);
    const imageURL = imageResults?.image_results?.[0]?.image;

    // save image to DB
    await db.unitImage.create({
      data: {
        unitId,
        unitName,
        imageURL,
      },
    });

    revalidatePath("/games/");
    return imageURL;
  } else {
    // return db Image
    revalidatePath("/games/");
    return existingUnitImage.imageURL;
  }
};

export default unitImage;
