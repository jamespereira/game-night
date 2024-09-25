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
import { z } from "zod";
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

type Props = { teams: Team[]; gameId: number; result: Result };

const GameResult = ({ teams, gameId }: Props) => {
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof ResultSchema>>({
    resolver: zodResolver(ResultSchema),
    defaultValues: {
      winner: undefined,
      loser: undefined,
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
        <Button className="bg-amber-600/75">Edit Result</Button>
      </DialogTrigger>
      <DialogContent className="bg-[#163749] border-sky-400 border-2 max-h-full h-full overflow-auto md:h-auto">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold text-stone-200">
                Edit Result
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
                              {team.teamNumber}: {team.users.join(", ")}
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
                              {team.teamNumber}: {team.users.join(", ")}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormError message={error} />
              <FormSuccess message={success} />
              {/* <Button disabled={isPending} type="submit" className="w-full">
          Create Game
        </Button> */}
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button
                  // onClick={() => handleUpdateResult()}
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
