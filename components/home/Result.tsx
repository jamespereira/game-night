"use client";

import React, {
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

type Props = { teams: Team[]; gameResult: ResultDetails };

const GameResult = ({ teams, gameResult }: Props) => {
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();

  const [showBattleReport, setShowBattleReport] = useState(
    !!gameResult?.battleReport || false
  );
  const [numberOfRounds, setNumberOfRounds] = useState(5);
  const roundsArray = [1, 2, 3, 4, 5];
  const numberOfTableColumns = Array.from({ length: numberOfRounds });

  const form = useForm<z.infer<typeof ResultSchema>>({
    resolver: zodResolver(ResultSchema),
    defaultValues: {
      winner: undefined,
      loser: undefined,
      battleReport: undefined,
    },
  });

  const onSubmit = (values: z.infer<typeof ResultSchema>) => {
    setError("");
    setSuccess("");

    startTransition(() => {
      result(values, gameResult.gameId)
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
        <Button className="bg-amber-600/75">Update Result</Button>
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
            <div className="h-[400px] overflow-y-auto">
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
                        defaultValue={gameResult.winner || field.value}
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
                        defaultValue={gameResult.loser || field.value}
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
                <div>
                  include battle report:
                  <Checkbox
                    checked={showBattleReport}
                    onCheckedChange={() => {
                      setShowBattleReport(!showBattleReport);
                    }}
                  />
                  {showBattleReport ? (
                    <>
                      <div>
                        Rounds:
                        <Select
                          disabled={isPending}
                          onValueChange={(e) => setNumberOfRounds(Number(e))}
                          defaultValue={"5"}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select the number of rounds" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {roundsArray.map((round) => (
                              <SelectItem key={round} value={round.toString()}>
                                {round}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <FormField
                        control={form.control}
                        name="battleReport.battlePlan"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Battle Plan</FormLabel>
                            <Select
                              disabled={isPending}
                              onValueChange={field.onChange}
                              defaultValue={
                                gameResult.battleReport?.battlePlan ||
                                field.value
                              }
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
                      Team: 1
                      <Table>
                        <TableHeader>
                          <TableRow className="border-stone-300/85">
                            <TableHead className="text-sky-400">
                              Round:{" "}
                            </TableHead>
                            {numberOfTableColumns.map((_, index) => (
                              <TableHead key={index} className="text-sky-400">
                                {index + 1}
                              </TableHead>
                            ))}
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          <TableRow className="border-stone-300/85">
                            <TableCell className=" text-stone-200">
                              Turn position:
                            </TableCell>

                            {numberOfTableColumns.map((_, index) => (
                              <TableCell
                                key={index}
                                className=" text-stone-200"
                              >
                                <div>position</div>
                                <FormField
                                  control={form.control}
                                  name={`battleReport.rounds.${
                                    index + 1
                                  }.turns.1.position`}
                                  render={({ field }) => (
                                    <FormItem>
                                      <Select
                                        disabled={isPending}
                                        onValueChange={field.onChange}
                                        defaultValue={
                                          // gameResult.battleReport?.rounds[index + 1]
                                          //   ?.turns[1]?.position ||
                                          field.value
                                        }
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

                            {numberOfTableColumns.map((_, index) => (
                              <TableCell
                                key={index}
                                className=" text-stone-200"
                              >
                                <FormField
                                  control={form.control}
                                  name="battleReport.battlePlan"
                                  render={({ field }) => (
                                    <FormItem>
                                      <Select
                                        disabled={isPending}
                                        onValueChange={field.onChange}
                                        defaultValue={
                                          gameResult.battleReport?.battlePlan ||
                                          field.value
                                        }
                                      >
                                        <FormControl>
                                          <SelectTrigger>
                                            <SelectValue placeholder="Battle Tactic" />
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
                              </TableCell>
                            ))}
                          </TableRow>
                          <TableRow>
                            <TableCell className=" text-stone-200">
                              Battle Tactic Completed:
                            </TableCell>

                            {numberOfTableColumns.map((_, index) => (
                              <TableCell
                                key={index}
                                className=" text-stone-200"
                              >
                                <Checkbox
                                  checked={showBattleReport}
                                  onCheckedChange={() => {
                                    setShowBattleReport(!showBattleReport);
                                  }}
                                />
                              </TableCell>
                            ))}
                          </TableRow>
                          <TableRow>
                            <TableCell className=" text-stone-200">
                              Objective Points:
                            </TableCell>

                            {numberOfTableColumns.map((_, index) => (
                              <TableCell
                                key={index}
                                className=" text-stone-200"
                              >
                                <Input
                                  placeholder="4"
                                  type="password"
                                  disabled={isPending}
                                />
                              </TableCell>
                            ))}
                          </TableRow>
                          <TableRow>
                            <TableCell className=" text-stone-200">
                              Victory Points:
                            </TableCell>
                            {numberOfTableColumns.map((_, index) => (
                              <TableCell
                                key={index}
                                className=" text-stone-200"
                              >
                                <Input
                                  placeholder="4"
                                  type="password"
                                  disabled={isPending}
                                />
                              </TableCell>
                            ))}
                          </TableRow>
                          <TableRow>
                            <TableCell className=" text-stone-200">
                              Conceded:
                            </TableCell>
                            {numberOfTableColumns.map((_, index) => (
                              <TableCell
                                key={index}
                                className=" text-stone-200"
                              >
                                <Checkbox
                                  checked={showBattleReport}
                                  onCheckedChange={() => {
                                    setShowBattleReport(!showBattleReport);
                                  }}
                                />
                              </TableCell>
                            ))}
                          </TableRow>
                        </TableBody>
                      </Table>
                    </>
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
