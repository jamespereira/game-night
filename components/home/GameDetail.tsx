import { getTeamsByGameId } from "@/data/team";
import { Game } from "../../interfaces";
import Countdown from "./Countdown";
import TeamTile from "./TeamTile";
import { getAllUsers, getUserById, getUsersByIds } from "@/data/user";

type Props = {
  game: any;
};

const GameDetail = async ({ game }: Props) => {
  const teams = await getTeamsByGameId(game.id);

  async function getTeamDetails(teams, teamNumber) {
    const teamUserIds = teams.find(
      (team) => team.teamNumber === teamNumber
    ).users;

    const teamUsers = await getUsersByIds(teamUserIds);
    const teamDetails = {
      teamNumber,
      users: teamUsers,
    };
    return teamDetails;
  }

  return (
    <div className="flex max-w-[1176px] flex-col gap-y-8 mt-[80px]">
      <Countdown game={game} />
      <div className="flex w-full flex-row items-center justify-between gap-x-4">
        <TeamTile
          gameId={game.id}
          teamDetails={await getTeamDetails(teams, 1)}
        />
        <p className="text-3xl text-stone-200">vs</p>
        <TeamTile
          gameId={game.id}
          teamDetails={await getTeamDetails(teams, 2)}
        />
      </div>
    </div>
  );
};

export default GameDetail;
