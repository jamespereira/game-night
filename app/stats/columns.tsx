"use client";

import { ColumnDef } from "@tanstack/react-table";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type UserStats = {
  id: string;
  name: string;
  wins: number;
  losses: number;
  wPercent: string;
  played: number;
  // status: "pending" | "processing" | "success" | "failed"
};

export const columns: ColumnDef<UserStats>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "wins",
    header: "Wins",
  },
  {
    accessorKey: "losses",
    header: "Losses",
  },
  {
    accessorKey: "wPercent",
    header: "Win %",
  },
  {
    accessorKey: "played",
    header: "Games Played",
  },
];
