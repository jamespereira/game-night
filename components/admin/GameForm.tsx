"use client";

import * as z from "zod";
import { useState, useTransition } from "react";
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
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
  SelectTrigger,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { NewGameSchema } from "@/schemas";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import FormError from "../FormError";
import FormSuccess from "../FormSuccess";
import { Checkbox } from "../ui/checkbox";
import newGame from "@/actions/new-game";
import { User } from "@prisma/client";

type Props = {
  users: User[];
};
const GameForm = ({ users }: Props) => {
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();
  const form = useForm<z.infer<typeof NewGameSchema>>({
    resolver: zodResolver(NewGameSchema),
    defaultValues: {
      host: "",
      location: "",
      date: "",
      pointsLimit: 2000,
      teams: [
        { teamNumber: 1, users: [] },
        { teamNumber: 2, users: [] },
      ],
    },
  });

  const userOptions = users.map((user) => ({ id: user.id, label: user.name }));

  const onSubmit = (values: z.infer<typeof NewGameSchema>) => {
    setError("");
    setSuccess("");

    startTransition(() => {
      newGame(values)
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
                  defaultValue={field.value}
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
                                  ? field.onChange([...field.value, user.id])
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
                                  ? field.onChange([...field.value, user.id])
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
        <Button disabled={isPending} type="submit" className="w-full">
          Create Game
        </Button>
      </form>
    </Form>
  );
};

export default GameForm;
