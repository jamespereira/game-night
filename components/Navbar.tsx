"use client";

import Link from "next/link";
import React from "react";
import UserButton from "./auth/UserButton";
import { usePathname } from "next/navigation";
import useCurrentUser from "@/hooks/use-current-user";

const Navbar = () => {
  const pathname = usePathname();

  const user = useCurrentUser();
  return (
    <nav className="h-[60px] sticky top-0 w-full backdrop-blur-sm flex justify-between p-4 items-center border-b border-b-stone-400/50 z-10 text-sm">
      <Link
        href="/"
        className={pathname === "/" ? "text-stone-100" : "text-stone-400"}
      >
        ⚔️ Game Night
      </Link>

      <Link
        href="/stats"
        className={pathname === "/stats" ? "text-stone-100" : "text-stone-400"}
      >
        Stats
      </Link>
      {user ? (
        <UserButton pathname={pathname} />
      ) : (
        <Link
          href="/auth/login"
          className={
            pathname === "/auth/login" ? "text-stone-100" : "text-stone-400"
          }
        >
          Login
        </Link>
      )}
    </nav>
  );
};

export default Navbar;
