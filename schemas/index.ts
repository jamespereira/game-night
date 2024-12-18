import { UserRole } from "@prisma/client";
import * as z from "zod";

const turn = z.object({
  teamNumber: z.optional(z.coerce.number()),
  position: z.optional(z.string()),
  battleTactic: z.optional(z.string()),
  btCompleted: z.optional(z.boolean()),
  objectivePoints: z.optional(z.coerce.number()),
  victoryPoints: z.optional(z.coerce.number()),
  conceded: z.optional(z.boolean()),
});

export const ResultSchema = z.object({
  winner: z.optional(z.string()),
  loser: z.optional(z.string()),
  battleReport: z.optional(
    z.object({
      battlePlan: z.optional(z.string()),
      rounds: z.array(
        z.object({
          roundNumber: z.coerce.number(),
          turns: z.array(turn),
        })
      ),
    })
  ),
});

export const NewGameSchema = z.object({
  host: z.string().min(1, {
    message: "Host is required",
  }),
  location: z.string().min(1, {
    message: "Location is required",
  }),
  date: z.string().min(1, {
    message: "Date is required",
  }),
  pointsLimit: z.coerce.number().min(1, {
    message: "Point limit is required",
  }),
  teams: z.array(
    z.object({
      teamNumber: z.coerce.number(),
      users: z.array(z.string()),
    })
  ),
});

export const SettingsSchema = z
  .object({
    name: z.optional(z.string()),
    isTwoFactorEnabled: z.optional(z.boolean()),
    role: z.enum([UserRole.ADMIN, UserRole.USER]),
    email: z.optional(z.string().email()),
    password: z.optional(z.string().min(6)),
    newPassword: z.optional(z.string().min(6)),
  })
  .refine(
    (data) => {
      if (data.password && !data.newPassword) {
        return false;
      }
      return true;
    },
    {
      message: "New password is required",
      path: ["newPassword"],
    }
  )
  .refine(
    (data) => {
      if (data.newPassword && !data.password) {
        return false;
      }
      return true;
    },
    {
      message: "Password is required",
      path: ["password"],
    }
  );

export const ResetSchema = z.object({
  email: z.string().email({
    message: "Email is required",
  }),
});

export const LoginSchema = z.object({
  email: z.string().email({
    message: "Email is required",
  }),
  password: z.string().min(1, {
    message: "Password is required",
  }),
  code: z.optional(z.string()),
});

export const RegisterSchema = z.object({
  email: z.string().email({
    message: "Email is required",
  }),
  password: z.string().min(6, {
    message: "Minimum 6 characters required",
  }),
  name: z.string().min(1, {
    message: "Name is required",
  }),
});

export const NewPasswordSchema = z.object({
  password: z.string().min(6, {
    message: "Minimum 6 characters required",
  }),
});
