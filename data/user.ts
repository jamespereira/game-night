import { db } from "@/lib/db";

export const getUserByEmail = async (email: string) => {
  try {
    const user = await db.user.findUnique({ where: { email } });
    return user;
  } catch {
    return null;
  }
};

export const getUserById = async (id: string) => {
  try {
    const user = await db.user.findUnique({ where: { id } });
    return user;
  } catch {
    return null;
  }
};

export const getAllUsers = async () => {
  try {
    const allUsers = await db.user.findMany();
    return allUsers;
  } catch {
    return null;
  }
};

export const getUsersByIds = async (ids: string[]) => {
  try {
    const users = await db.user.findMany({
      where: {
        id: { in: ids },
      },
    });
    return users;
  } catch {
    return null;
  }
};
