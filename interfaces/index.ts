// You can include shared interfaces/types in a separate file
// and then use them in any component by importing them. For
// example, to import the interface below do:
//
// import { User } from 'path/to/interfaces';

import {
  Army,
  Unit,
  User,
  Result,
  BattleReport,
  Round,
  Turn,
  Team,
  Game,
} from "@prisma/client";
export interface ArmyDetails extends Army {
  units: Unit[];
}

export type TeamDetails = {
  teamNumber: string;
  users: User[];
};

export type Faction = {
  factionName: string;
  factionList: any;
};

export interface RoundDetails extends Round {
  turns: Turn[];
}
export interface BattleReportDetails extends BattleReport {
  rounds: RoundDetails[];
}

export interface ResultDetails extends Result {
  battleReport: BattleReportDetails;
}

export interface GameDetails extends Game {
  teams: Team[];
}
