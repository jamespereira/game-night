export const battlePlans = [
  { id: "11", table: 1, number: 1, name: "Border War" },
  { id: "12", table: 1, number: 2, name: "Focal Points" },
  { id: "13", table: 1, number: 3, name: "Starstrike" },
  { id: "14", table: 1, number: 4, name: "Shifting Objectives" },
  { id: "15", table: 1, number: 5, name: "Feral Foray" },
  { id: "16", table: 1, number: 6, name: "The Jaws Of Gallet" },
  { id: "21", table: 2, number: 1, name: "Battle For The Pass" },
  { id: "22", table: 2, number: 2, name: "Scorched Earth" },
  { id: "23", table: 2, number: 3, name: "The Better Part Of Valour" },
  { id: "24", table: 2, number: 4, name: "The Vice" },
  { id: "25", table: 2, number: 5, name: "Close To The Chest" },
  { id: "26", table: 2, number: 6, name: "Limited Resources" },
];

export const getBattlePlanById = (id: string) => {
  const battlePlan = battlePlans.find((b) => b.id === id)?.name;
  return battlePlan;
};
