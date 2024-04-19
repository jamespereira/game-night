export const getPointsTotal = (army) => {
  const unitPoints = army?.units.map((unit) => unit.points);
  const totalPoints = unitPoints?.reduce((a, c) => a + c, 0);
  return totalPoints;
};

function createObjectArray(data) {
  if (Array.isArray(data)) {
    return data;
  } else {
    return [data];
  }
}

export const getUnitPoints = (unit) => {
  const unitCategories = createObjectArray(unit.categoryLinks?.categoryLink);

  const isScenery = unitCategories.find(
    (category) => category._name.toLowerCase() === "scenery"
  );
  if (isScenery) {
    return 0;
  }

  const heroPoints = Number(unit.costs?.cost._value);
  if (heroPoints > 0) {
    return heroPoints;
  }

  const unitSelections = createObjectArray(
    unit.selectionEntries?.selectionEntry
  );

  const modelsPoints = Number(
    unitSelections?.find((entry) =>
      entry?._name.toLowerCase().includes(unit?._name.toLowerCase())
    )?.costs?.cost._value
  );

  if (modelsPoints > 0) {
    return modelsPoints;
  }
  return 0;
};
