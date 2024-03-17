import { Game } from "../interfaces";

/** Dummy event data. */
export const sampleGameData: Game[] = [
  {
    id: "1",
    location: "123 Fake st",
    date: "2024-03-10T18:30:00",
    time: "18:30",
    teams: [
      {
        id: "1",
        teamNumber: 1,
        users: [
          {
            id: "101",
            name: "James",
            army: {
              id: "1",
              faction: "Lumineth",
              subfaction: "Zaitrec",
              units: [
                {
                  id: "1",
                  name: "Warden",
                  wounds: 1,
                  modelCount: 10,
                  unitType: "Battleline",
                  points: 160,
                },
                {
                  id: "2",
                  name: "Scinari Enlightener",
                  wounds: 6,
                  modelCount: 1,
                  unitType: "Leader",
                  points: 170,
                },
                {
                  id: "3",
                  name: "Dawnriders",
                  wounds: 2,
                  modelCount: 5,
                  unitType: "Other",
                  points: 120,
                },
                {
                  id: "4",
                  name: "Scinari Cathallar",
                  wounds: 5,
                  modelCount: 1,
                  unitType: "Leader",
                  points: 120,
                },
              ],
            },
          },
          {
            id: "102",
            name: "Kenny",
            army: {
              id: "1",
              faction: "Orruk Warclans",
              subfaction: "Big Waagh",
              units: [
                {
                  id: "1",
                  name: "Gutrippaz",
                  wounds: 2,
                  modelCount: 10,
                  unitType: "Battleline",
                  points: 180,
                },
                {
                  id: "2",
                  name: "Gordrakk",
                  wounds: 20,
                  modelCount: 1,
                  unitType: "Leader",
                  points: 440,
                },
                {
                  id: "3",
                  name: "Boltboyz",
                  wounds: 2,
                  modelCount: 3,
                  unitType: "Other",
                  points: 120,
                },
                {
                  id: "4",
                  name: "Hobgrotts",
                  wounds: 1,
                  modelCount: 10,
                  unitType: "Battleline",
                  points: 80,
                },
                {
                  id: "5",
                  name: "Hobgrotts",
                  wounds: 1,
                  modelCount: 10,
                  unitType: "Battleline",
                  points: 80,
                },
              ],
            },
          },
        ],
      },
      {
        id: "2",
        teamNumber: 2,
        users: [
          {
            id: "103",
            name: "Lim",
            army: {
              id: "1",
              faction: "Daughters of Khaine",
              subfaction: "Medusai",
              units: [
                {
                  id: "1",
                  name: "Harpies",
                  wounds: 1,
                  modelCount: 10,
                  unitType: "Battleline",
                  points: 160,
                },
                {
                  id: "2",
                  name: "Morathi",
                  wounds: 6,
                  modelCount: 1,
                  unitType: "Leader",
                  points: 170,
                },
                {
                  id: "3",
                  name: "Bloodseekers",
                  wounds: 2,
                  modelCount: 5,
                  unitType: "Other",
                  points: 120,
                },
                {
                  id: "4",
                  name: "Avatar of Khaine",
                  wounds: 5,
                  modelCount: 1,
                  unitType: "Leader",
                  points: 120,
                },
              ],
            },
          },
          {
            id: "104",
            name: "Opal",
            army: {
              id: "1",
              faction: "Stormcast Eternals",
              subfaction: "Thunderguys",
              units: [
                {
                  id: "1",
                  name: "Vindicators",
                  wounds: 2,
                  modelCount: 10,
                  unitType: "Battleline",
                  points: 180,
                },
                {
                  id: "2",
                  name: "Bastilon",
                  wounds: 20,
                  modelCount: 1,
                  unitType: "Leader",
                  points: 440,
                },
                {
                  id: "3",
                  name: "Justicars",
                  wounds: 2,
                  modelCount: 3,
                  unitType: "Other",
                  points: 120,
                },
                {
                  id: "4",
                  name: "Annihilators",
                  wounds: 1,
                  modelCount: 10,
                  unitType: "Battleline",
                  points: 80,
                },
                {
                  id: "5",
                  name: "Liberators",
                  wounds: 1,
                  modelCount: 10,
                  unitType: "Battleline",
                  points: 80,
                },
              ],
            },
          },
        ],
      },
    ],
  },
  {
    id: "2",
    location: "456 New st",
    date: "2024-4-10T18:30:00",
    time: "18:30",
    teams: [
      {
        id: "1",
        teamNumber: 1,
        users: [
          {
            id: "101",
            name: "Jaames",
            army: {
              id: "1",
              faction: "Lumineth",
              subfaction: "Zaitrec",
              units: [
                {
                  id: "1",
                  name: "Warden",
                  wounds: 1,
                  modelCount: 10,
                  unitType: "Battleline",
                  points: 160,
                },
                {
                  id: "2",
                  name: "Scinari Enlightener",
                  wounds: 6,
                  modelCount: 1,
                  unitType: "Leader",
                  points: 170,
                },
                {
                  id: "3",
                  name: "Dawnriders",
                  wounds: 2,
                  modelCount: 5,
                  unitType: "Other",
                  points: 120,
                },
                {
                  id: "2",
                  name: "Scinari Cathallar",
                  wounds: 5,
                  modelCount: 1,
                  unitType: "Leader",
                  points: 120,
                },
              ],
            },
          },
          {
            id: "102",
            name: "Kenny",
            army: {
              id: "1",
              faction: "Orruk Warclans",
              subfaction: "Big Waagh",
              units: [
                {
                  id: "1",
                  name: "Gutrippaz",
                  wounds: 2,
                  modelCount: 10,
                  unitType: "Battleline",
                  points: 180,
                },
                {
                  id: "2",
                  name: "Gordrakk",
                  wounds: 20,
                  modelCount: 1,
                  unitType: "Leader",
                  points: 440,
                },
                {
                  id: "3",
                  name: "Boltboyz",
                  wounds: 2,
                  modelCount: 3,
                  unitType: "Other",
                  points: 120,
                },
                {
                  id: "4",
                  name: "Hobgrotts",
                  wounds: 1,
                  modelCount: 10,
                  unitType: "Battleline",
                  points: 80,
                },
                {
                  id: "4",
                  name: "Hobgrotts",
                  wounds: 1,
                  modelCount: 10,
                  unitType: "Battleline",
                  points: 80,
                },
              ],
            },
          },
        ],
      },
      {
        id: "2",
        teamNumber: 2,
        users: [
          {
            id: "103",
            name: "Lim",
            army: {
              id: "1",
              faction: "Lumineth",
              subfaction: "Zaitrec",
              units: [
                {
                  id: "1",
                  name: "Warden",
                  wounds: 1,
                  modelCount: 10,
                  unitType: "Battleline",
                  points: 160,
                },
                {
                  id: "2",
                  name: "Scinari Enlightener",
                  wounds: 6,
                  modelCount: 1,
                  unitType: "Leader",
                  points: 170,
                },
                {
                  id: "3",
                  name: "Dawnriders",
                  wounds: 2,
                  modelCount: 5,
                  unitType: "Other",
                  points: 120,
                },
                {
                  id: "2",
                  name: "Scinari Cathallar",
                  wounds: 5,
                  modelCount: 1,
                  unitType: "Leader",
                  points: 120,
                },
              ],
            },
          },
          {
            id: "104",
            name: "Opal",
            army: {
              id: "1",
              faction: "Orruk Warclans",
              subfaction: "Big Waagh",
              units: [
                {
                  id: "1",
                  name: "Gutrippaz",
                  wounds: 2,
                  modelCount: 10,
                  unitType: "Battleline",
                  points: 180,
                },
                {
                  id: "2",
                  name: "Gordrakk",
                  wounds: 20,
                  modelCount: 1,
                  unitType: "Leader",
                  points: 440,
                },
                {
                  id: "3",
                  name: "Boltboyz",
                  wounds: 2,
                  modelCount: 3,
                  unitType: "Other",
                  points: 120,
                },
                {
                  id: "4",
                  name: "Hobgrotts",
                  wounds: 1,
                  modelCount: 10,
                  unitType: "Battleline",
                  points: 80,
                },
                {
                  id: "4",
                  name: "Hobgrotts",
                  wounds: 1,
                  modelCount: 10,
                  unitType: "Battleline",
                  points: 80,
                },
              ],
            },
          },
        ],
      },
    ],
  },
];
