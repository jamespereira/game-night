import { getAllResults } from "@/data/result";
import { UserStats, columns } from "./columns";
import { DataTable } from "./data-table";
import result from "@/actions/result";
import { getAllUsers } from "@/data/user";
import { getAllGames } from "@/data/game";
import { getAllTeams } from "@/data/team";

function countOccurrences(array, string) {
  let count = 0;

  for (let i = 0; i < array.length; i++) {
    if (array[i] === string) {
      count++;
    }
  }

  return count;
}

function calculateWPercent(wins, total) {
  if (total === 0) {
    return "N/A";
  }
  if (wins === 0) {
    return "0%";
  }
  return `${(100 * wins) / total}%`;
}

async function getData(): Promise<any[]> {
  // Fetch data from your API here.
  // const gamesDetails = await getAllGames();

  const allUsers = await getAllUsers();
  const users = allUsers?.filter((a) => a.role !== "ADMIN");

  const resultDetails = await getAllResults();

  const allTeams = await getAllTeams();
  const winningTeams = resultDetails?.map((r) => r.winner);
  const losingTeams = resultDetails?.map((r) => r.loser);

  const winningUsers = allTeams.find((a) =>
    winningTeams.some((w) => a.id.includes(w))
  ).users;

  const losingUsers = allTeams.find((a) =>
    losingTeams.some((w) => a.id.includes(w))
  ).users;

  const playerStats = users.map((u) => ({
    id: u.id,
    name: u.name,
    wins: countOccurrences(winningUsers, u.id),
    losses: countOccurrences(losingUsers, u.id),
    wPercent: calculateWPercent(
      countOccurrences(winningUsers, u.id),
      countOccurrences(winningUsers, u.id) + countOccurrences(losingUsers, u.id)
    ),
    played:
      countOccurrences(winningUsers, u.id) +
      countOccurrences(losingUsers, u.id),
  }));
  return playerStats;
}

export default async function statsPage() {
  const data = await getData();

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl sm:text-3xl font-extrabold text-stone-200">
        Stats
      </h1>
      <p className="mt-2 text-lg text-stone-300/85 mb-8">
        Battle stats, rankings and leaderboards
      </p>
      <DataTable columns={columns} data={data} />
    </div>
  );
}
