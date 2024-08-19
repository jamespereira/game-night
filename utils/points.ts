export const getPointsTotal = (army) => {
  const unitPoints = army?.units.map((unit) => unit.points);
  const totalPoints = unitPoints?.reduce((a, c) => a + c, 0);
  return totalPoints;
};

export const getUnitPoints = (unit) => {
  const hasPoints = Number(unit.costs?.cost._value);
  if (hasPoints > 0) {
    return hasPoints;
  }
  return 0;
};
