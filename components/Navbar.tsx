import Link from "next/link";
import React from "react";
import UserButton from "./auth/UserButton";
import { currentUser } from "@/lib/auth";

const Navbar = async () => {
  const user = await currentUser();
  return (
    <nav className="h-[60px] sticky top-0 w-full backdrop-blur-sm flex justify-between p-4 items-center border-b border-b-stone-400/50">
      <Link href="/" className="text-stone-400 text-sm">
        ⚔️ Game Night
      </Link>
      {user ? (
        <UserButton />
      ) : (
        <Link href="/auth/login" className="text-stone-400">
          Login
        </Link>
      )}
    </nav>
  );
};

export default Navbar;
