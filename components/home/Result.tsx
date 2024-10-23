"use client";

import React, {
  Fragment,
  Suspense,
  startTransition,
  useState,
  useTransition,
} from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { ResultSchema } from "@/schemas";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { number, z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Input } from "../ui/input";
import FormError from "../FormError";
import FormSuccess from "../FormSuccess";
import { Team } from "@prisma/client";
import { getUsersByIds } from "@/data/user";
import result from "@/actions/result";
import { getResultByGameId } from "@/data/result";
import { Result } from "@prisma/client";
import { battlePlans } from "@/utils/battle-plans";
import { Checkbox } from "../ui/checkbox";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { ResultDetails } from "@/interfaces";
import { battleTactics } from "@/utils/battle-tactics";
import { Switch } from "../ui/switch";
import removeResult from "@/actions/remove-result";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/alert-dialog";
import { FaTrash } from "react-icons/fa";

type Props = { teams: Team[]; gameResult: ResultDetails; gameId: number };

const GameResult = ({ teams, gameResult, gameId }: Props) => {
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();

  const [showBattleReport, setShowBattleReport] = useState(
    !!gameResult?.battleReport || false
  );
  const roundsSelector = [1, 2, 3, 4, 5];

  const roundsArray = roundsSelector.map((number) => ({
    roundNumber: number,
    turns: teams.map((team) => ({
      teamNumber: team.teamNumber,
      position: "",
      battleTactic: "",
      btCompleted: false,
      objectivePoints: 0,
      victoryPoints: 0,
      conceded: false,
    })),
  }));

  const form = useForm<z.infer<typeof ResultSchema>>({
    resolver: zodResolver(ResultSchema),
    defaultValues: {
      winner: gameResult?.winner || undefined,
      loser: gameResult?.loser || undefined,
      battleReport:
        {
          battlePlan: gameResult?.battleReport?.battlePlan || undefined,
          rounds:
            gameResult?.battleReport?.rounds?.map((round) => ({
              roundNumber: round?.roundNumber || undefined,
              turns: round?.turns?.map((turn) => ({
                teamNumber: turn?.teamNumber || undefined,
                position: turn?.position || undefined,
                battleTactic: turn?.battleTactic || undefined,
                btCompleted: turn?.btCompleted || undefined,
                objectivePoints: turn?.objectivePoints || undefined,
                victoryPoints: turn?.victoryPoints || undefined,
                conceded: turn?.conceded || undefined,
              })),
            })) || roundsArray,
        } || undefined,
    },
  });

  const onSubmit = (values: z.infer<typeof ResultSchema>) => {
    setError("");
    setSuccess("");

    startTransition(() => {
      result(values, gameId)
        .then((data) => {
          if (data?.error) {
            form.reset();
            setError(data.error);
          }
          if (data?.success) {
            form.reset();
            setSuccess(data.success);
          }
        })
        .catch(() => setError("Something went wrong!"));
    });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" size="sm">
          Update Result
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-[#163749] border-sky-400 border-2 max-w-full max-h-full h-full overflow-auto md:h-auto">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold text-stone-200">
                Update Result
              </DialogTitle>
              <DialogDescription className="text-stone-300/85 font-semibold">
                Update result for the game
              </DialogDescription>
            </DialogHeader>
            {gameResult?.id ? (
              <div>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="default" size="icon">
                      <FaTrash />
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>
                        Are you absolutely sure?
                      </AlertDialogTitle>
                      <AlertDialogDescription>
                        This action cannot be undone. This will permanently
                        delete your result and remove the result data from our
                        servers.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction asChild>
                        <button onClick={() => removeResult(gameResult?.id)}>
                          Continue
                        </button>
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            ) : null}

            <div className=" overflow-y-auto">
              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="winner"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Winner</FormLabel>
                      <Select
                        disabled={isPending}
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select the winner" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {teams.map((team) => (
                            <SelectItem key={team.id} value={team.id}>
                              Team: {team.teamNumber}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="loser"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Loser</FormLabel>
                      <Select
                        disabled={isPending}
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select the loser" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {teams.map((team) => (
                            <SelectItem key={team.id} value={team.id}>
                              Team: {team.teamNumber}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="battleReport.battlePlan"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Battle Plan</FormLabel>
                      <Select
                        disabled={isPending}
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select the Battle Plan" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {battlePlans.map((battlePlan) => (
                            <SelectItem
                              key={battlePlan.id}
                              value={battlePlan.id}
                            >
                              {battlePlan.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div>
                  include battle report:
                  <Checkbox
                    checked={showBattleReport}
                    onCheckedChange={() => {
                      setShowBattleReport(!showBattleReport);
                    }}
                  />
                  {showBattleReport ? (
                    <div>
                      {/* <div>
                        Rounds:
                        <Select
                          disabled={isPending}
                          onValueChange={(e) => setNumberOfRounds(Number(e))}
                          defaultValue={"1"}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select the number of rounds" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {roundsSelector.map((round) => (
                              <SelectItem key={round} value={round.toString()}>
                                {round}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div> */}
                      {teams.map((team) => {
                        return (
                          <Fragment key={team.id}>
                            Team: {team.teamNumber}
                            <Table>
                              <TableHeader>
                                <TableRow className="border-stone-300/85">
                                  <TableHead className="text-sky-400">
                                    Round:{" "}
                                  </TableHead>
                                  {roundsArray.map((round) => (
                                    <TableHead
                                      key={round.roundNumber}
                                      className="text-sky-400"
                                    >
                                      {round.roundNumber}
                                    </TableHead>
                                  ))}
                                </TableRow>
                              </TableHeader>
                              <TableBody>
                                <TableRow className="border-stone-300/85">
                                  <TableCell className=" text-stone-200">
                                    Turn position:
                                  </TableCell>

                                  {roundsArray.map((round, index) => (
                                    <TableCell
                                      key={index}
                                      className=" text-stone-200"
                                    >
                                      <FormField
                                        control={form.control}
                                        name={`battleReport.rounds.${index}.turns.${
                                          team.teamNumber - 1
                                        }.position`}
                                        render={({ field }) => (
                                          <FormItem>
                                            <Select
                                              disabled={isPending}
                                              onValueChange={field.onChange}
                                              defaultValue={field.value}
                                            >
                                              <FormControl>
                                                <SelectTrigger>
                                                  <SelectValue placeholder="Turn position" />
                                                </SelectTrigger>
                                              </FormControl>
                                              <SelectContent>
                                                <SelectItem value="top">
                                                  Top
                                                </SelectItem>
                                                <SelectItem value="bottom">
                                                  Bottom
                                                </SelectItem>
                                              </SelectContent>
                                            </Select>
                                            <FormMessage />
                                          </FormItem>
                                        )}
                                      />
                                    </TableCell>
                                  ))}
                                </TableRow>
                                <TableRow>
                                  <TableCell className=" text-stone-200">
                                    Battle Tactic:
                                  </TableCell>

                                  {roundsArray.map((round, index) => (
                                    <TableCell
                                      key={index}
                                      className=" text-stone-200"
                                    >
                                      <FormField
                                        control={form.control}
                                        name={`battleReport.rounds.${index}.turns.${
                                          team.teamNumber - 1
                                        }.battleTactic`}
                                        render={({ field }) => (
                                          <FormItem>
                                            <Select
                                              disabled={isPending}
                                              onValueChange={field.onChange}
                                              defaultValue={field.value}
                                            >
                                              <FormControl>
                                                <SelectTrigger>
                                                  <SelectValue placeholder="Battle Tactic" />
                                                </SelectTrigger>
                                              </FormControl>
                                              <SelectContent>
                                                {battleTactics.map(
                                                  (battleTactic) => (
                                                    <SelectItem
                                                      key={battleTactic.id}
                                                      value={battleTactic.id}
                                                    >
                                                      {battleTactic.name}
                                                    </SelectItem>
                                                  )
                                                )}
                                              </SelectContent>
                                            </Select>
                                            <FormMessage />
                                          </FormItem>
                                        )}
                                      />
                                    </TableCell>
                                  ))}
                                </TableRow>
                                <TableRow>
                                  <TableCell className=" text-stone-200">
                                    Battle Tactic Completed:
                                  </TableCell>

                                  {roundsArray.map((round, index) => (
                                    <TableCell
                                      key={index}
                                      className=" text-stone-200"
                                    >
                                      <FormField
                                        control={form.control}
                                        name={`battleReport.rounds.${index}.turns.${
                                          team.teamNumber - 1
                                        }.btCompleted`}
                                        render={({ field }) => (
                                          <FormItem className="flex flex-row items-center justify-between rounded-lg p-3 shadow-sm">
                                            <div className="space-y-0.5"></div>
                                            <FormControl>
                                              <Switch
                                                disabled={isPending}
                                                checked={field.value}
                                                onCheckedChange={field.onChange}
                                              />
                                            </FormControl>
                                            <FormMessage />
                                          </FormItem>
                                        )}
                                      />
                                    </TableCell>
                                  ))}
                                </TableRow>
                                <TableRow>
                                  <TableCell className=" text-stone-200">
                                    Objective Points:
                                  </TableCell>

                                  {roundsArray.map((round, index) => (
                                    <TableCell
                                      key={index}
                                      className=" text-stone-200"
                                    >
                                      <FormField
                                        control={form.control}
                                        name={`battleReport.rounds.${index}.turns.${
                                          team.teamNumber - 1
                                        }.objectivePoints`}
                                        render={({ field }) => (
                                          <FormItem>
                                            <FormControl>
                                              <Input
                                                {...field}
                                                placeholder="6"
                                                type="number"
                                                disabled={isPending}
                                              />
                                            </FormControl>
                                            <FormMessage />
                                          </FormItem>
                                        )}
                                      />
                                    </TableCell>
                                  ))}
                                </TableRow>
                                <TableRow>
                                  <TableCell className=" text-stone-200">
                                    Victory Points:
                                  </TableCell>
                                  {roundsArray.map((round, index) => (
                                    <TableCell
                                      key={index}
                                      className=" text-stone-200"
                                    >
                                      <FormField
                                        control={form.control}
                                        name={`battleReport.rounds.${index}.turns.${
                                          team.teamNumber - 1
                                        }.victoryPoints`}
                                        render={({ field }) => (
                                          <FormItem>
                                            <FormControl>
                                              <Input
                                                {...field}
                                                placeholder="10"
                                                type="number"
                                                disabled={isPending}
                                              />
                                            </FormControl>
                                            <FormMessage />
                                          </FormItem>
                                        )}
                                      />
                                    </TableCell>
                                  ))}
                                </TableRow>
                                <TableRow>
                                  <TableCell className=" text-stone-200">
                                    Conceded:
                                  </TableCell>
                                  {roundsArray.map((round, index) => (
                                    <TableCell
                                      key={index}
                                      className=" text-stone-200"
                                    >
                                      <FormField
                                        control={form.control}
                                        name={`battleReport.rounds.${index}.turns.${
                                          team.teamNumber - 1
                                        }.conceded`}
                                        render={({ field }) => (
                                          <FormItem className="flex flex-row items-center justify-between rounded-lg p-3 shadow-sm">
                                            <div className="space-y-0.5"></div>
                                            <FormControl>
                                              <Switch
                                                disabled={isPending}
                                                checked={field.value}
                                                onCheckedChange={field.onChange}
                                              />
                                            </FormControl>
                                            <FormMessage />
                                          </FormItem>
                                        )}
                                      />
                                    </TableCell>
                                  ))}
                                </TableRow>
                              </TableBody>
                            </Table>
                          </Fragment>
                        );
                      })}
                    </div>
                  ) : null}
                </div>
              </div>
              <FormError message={error} />
              <FormSuccess message={success} />
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button
                  className="bg-amber-600/75"
                  disabled={isPending}
                  type="submit"
                >
                  Update Result
                </Button>
              </DialogClose>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default GameResult;
