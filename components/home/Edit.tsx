"use client";

import React, { useState, useTransition } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { NewGameSchema } from "@/schemas";
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
import { Game, User } from "@prisma/client";
import { GameDetails } from "@/interfaces";
import { Checkbox } from "../ui/checkbox";
import updateGame from "@/actions/update-game";
import { FaEdit } from "react-icons/fa";

type Props = { game: GameDetails; users: User[] };

const Edit = ({ game, users }: Props) => {
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof NewGameSchema>>({
    resolver: zodResolver(NewGameSchema),
    defaultValues: {
      host: game.host,
      location: game.location,
      date: game.date,
      pointsLimit: game.pointsLimit,
      teams: [
        {
          teamNumber: 1,
          users: game.teams.find((team) => team.teamNumber === 1).users,
        },
        {
          teamNumber: 2,
          users: game.teams.find((team) => team.teamNumber === 2).users,
        },
      ],
    },
  });

  const userOptions = users.map((user) => ({ id: user.id, label: user.name }));

  const onSubmit = (values: z.infer<typeof NewGameSchema>) => {
    setError("");
    setSuccess("");

    startTransition(() => {
      updateGame(values, game.id)
        .then((data) => {
          form.reset();
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
        <Button variant="ghost" size="icon">
          <FaEdit />
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-[#163749] border-sky-400 border-2 max-w-full max-h-full h-full overflow-auto md:h-auto">
        <DialogTitle>Edit Game</DialogTitle>
        <DialogDescription>Edit the game details</DialogDescription>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="host"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Host</FormLabel>
                    <Select
                      disabled={isPending}
                      onValueChange={field.onChange}
                      defaultValue={game.host || field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a host" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {userOptions.map((user) => (
                          <SelectItem key={user.id} value={user.id}>
                            {user.label}
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
                name="location"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Location</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        disabled={isPending}
                        placeholder="123 Fake St"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="date"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Date</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        disabled={isPending}
                        type="datetime-local"
                        placeholder="dd/mm/yyyy"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="pointsLimit"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Points Limit</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        disabled={isPending}
                        placeholder="2000"
                        type="number"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* TO DO Make dynamic */}

              <FormField
                control={form.control}
                name={`teams.${0}`}
                render={() => (
                  <FormItem>
                    <div className="mb-4">
                      <FormLabel className="text-base">Team 1</FormLabel>
                    </div>
                    {userOptions.map((user) => (
                      <FormField
                        key={user.id}
                        control={form.control}
                        name={`teams.${0}.users`}
                        render={({ field }) => {
                          return (
                            <FormItem
                              key={user.id}
                              className="flex flex-row items-start space-x-3 space-y-0"
                            >
                              <FormControl>
                                <Checkbox
                                  checked={field.value?.includes(user.id)}
                                  onCheckedChange={(checked) => {
                                    return checked
                                      ? field.onChange([
                                          ...field.value,
                                          user.id,
                                        ])
                                      : field.onChange(
                                          field.value?.filter(
                                            (value) => value !== user.id
                                          )
                                        );
                                  }}
                                />
                              </FormControl>
                              <FormLabel className="font-normal">
                                {user.label}
                              </FormLabel>
                            </FormItem>
                          );
                        }}
                      />
                    ))}
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name={`teams.${1}`}
                render={() => (
                  <FormItem>
                    <div className="mb-4">
                      <FormLabel className="text-base">Team 2</FormLabel>
                    </div>
                    {userOptions.map((user) => (
                      <FormField
                        key={user.id}
                        control={form.control}
                        name={`teams.${1}.users`}
                        render={({ field }) => {
                          return (
                            <FormItem
                              key={user.id}
                              className="flex flex-row items-start space-x-3 space-y-0"
                            >
                              <FormControl>
                                <Checkbox
                                  checked={field.value?.includes(user.id)}
                                  onCheckedChange={(checked) => {
                                    return checked
                                      ? field.onChange([
                                          ...field.value,
                                          user.id,
                                        ])
                                      : field.onChange(
                                          field.value?.filter(
                                            (value) => value !== user.id
                                          )
                                        );
                                  }}
                                />
                              </FormControl>
                              <FormLabel className="font-normal">
                                {user.label}
                              </FormLabel>
                            </FormItem>
                          );
                        }}
                      />
                    ))}
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormError message={error} />
            <FormSuccess message={success} />
            <DialogClose asChild>
              <Button disabled={isPending} type="submit" className="w-full">
                Update Game
              </Button>
            </DialogClose>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default Edit;
