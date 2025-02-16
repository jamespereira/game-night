export const battleTactics = [
  { id: "1", type: "universal", name: "Do not waver" },
  { id: "2", type: "universal", name: "Take their land" },
  { id: "3", type: "universal", name: "Slay the entourage" },
  { id: "4", type: "universal", name: "Seize the centre" },
  { id: "5", type: "universal", name: "Attack on two fronts" },
  { id: "6", type: "universal", name: "Take the flanks" },
];

export const getBattleTacticById = (id: string) => {
  const battleTactic = battleTactics.find((b) => b.id === id)?.name;
  return battleTactic;
};
