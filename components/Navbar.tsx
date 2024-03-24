import Link from "next/link";
import React from "react";
import UserButton from "./auth/UserButton";
import { currentUser } from "@/lib/auth";

const Navbar = async () => {
  const user = await currentUser();
  return (
    <nav className="h-[80px] fixed w-full bg-red-800 flex justify-between p-4 items-center border-b border-b-stone-500">
      <Link href="/">⚔️</Link>
      {user ? <UserButton /> : <Link href="/auth/login">Login</Link>}
    </nav>
  );
};

export default Navbar;
