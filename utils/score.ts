import { RoundDetails } from "@/interfaces";

export const calculateVictoryPoints = (
  teamNumber: number,
  rounds: RoundDetails[]
) => {
  const victoryPoints = rounds?.reduce((total, round) => {
    const teamPoints = round?.turns?.reduce((teamTotal, turn) => {
      if (turn.teamNumber === teamNumber) {
        return teamTotal + turn.victoryPoints;
      }
      return teamTotal;
    }, 0);
    return total + teamPoints;
  }, 0);

  return victoryPoints;
};

export const checkConceded = (teamNumber: number, rounds: RoundDetails[]) => {
  const concededRounds = rounds.map(
    (r) => r.turns.find((t) => t.teamNumber === teamNumber).conceded
  );
  return concededRounds.find((r) => r === true);
};
