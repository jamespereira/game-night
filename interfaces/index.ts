// You can include shared interfaces/types in a separate file
// and then use them in any component by importing them. For
// example, to import the interface below do:
//
// import { User } from 'path/to/interfaces';

export type User = {
  id: string;
  name: string;
  email?: string;
  teamId?: string;
  gameId?: number;
  army?: Army[];
};

export type Unit = {
  id: string;
  unitId: string;
  name: string;
  unitType: string;
  points: number;
  image?: string;
  armyId: string;
};

export type Army = {
  id: string;
  faction: string;
  subfaction?: string;
  image?: string;
  units: Unit[];
  userId: string;
};

export type Team = {
  id: string;
  teamNumber: number;
  users: User[];
  gameId: number;
};

export type Game = {
  id: number;
  location: string;
  date: string;
  host?: User;
  pointsLimit?: number;
  teams: Team[];
};
