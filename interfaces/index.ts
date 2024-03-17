// You can include shared interfaces/types in a separate file
// and then use them in any component by importing them. For
// example, to import the interface below do:
//
// import { User } from 'path/to/interfaces';

export type Unit = {
  id: string;
  name: string;
  wounds?: number;
  modelCount: number;
  unitType: string;
  points: number;
};

export type Army = {
  id: string;
  faction: string;
  subfaction: string;
  units?: Array<Unit>;
};

export type User = {
  id: string;
  name: string;
  army?: Army;
};

export type Team = {
  id: string;
  teamNumber: number;
  users: User[];
};

export type Game = {
  id: string;
  location: string;
  date: string;
  time: string;
  host?: string;
  pointsLimit?: number;
  teams: Team[];
};
