export const getPointsTotal = (army) => {
  const unitPoints = army?.units.map((unit) => unit.points);
  const totalPoints = unitPoints?.reduce((a, c) => a + c, 0);
  return totalPoints;
};
