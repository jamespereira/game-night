"use client";

import { Button } from "@/components/ui/button";
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
};

export const columns: ColumnDef<UserStats>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <button
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Name
        </button>
      );
    },
  },
  {
    accessorKey: "wins",
    header: ({ column }) => {
      return (
        <button
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Wins
        </button>
      );
    },
  },
  {
    accessorKey: "losses",
    header: ({ column }) => {
      return (
        <button
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Losses
        </button>
      );
    },
  },
  {
    accessorKey: "wPercent",
    header: ({ column }) => {
      return (
        <button
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Win %
        </button>
      );
    },
  },
  {
    accessorKey: "played",
    header: ({ column }) => {
      return (
        <button
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Games Played
        </button>
      );
    },
  },
];
