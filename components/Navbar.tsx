"use client";

import Link from "next/link";
import React from "react";
import UserButton from "./auth/UserButton";
import { usePathname } from "next/navigation";
import useCurrentUser from "@/hooks/use-current-user";

const Navbar = () => {
  const pathName = usePathname();

  console.log("pathName", pathName);
  const user = useCurrentUser();
  return (
    <nav className="h-[60px] sticky top-0 w-full backdrop-blur-sm flex justify-between p-4 items-center border-b border-b-stone-400/50 z-10 text-sm">
      <Link
        href="/"
        className={pathName === "/" ? "text-stone-100" : "text-stone-400"}
      >
        ⚔️ Game Night
      </Link>

      <Link
        href="/stats"
        className={pathName === "/stats" ? "text-stone-100" : "text-stone-400"}
      >
        Stats
      </Link>
      {user ? (
        <UserButton pathName={pathName} />
      ) : (
        <Link
          href="/auth/login"
          className={
            pathName === "/auth/login" ? "text-stone-100" : "text-stone-400"
          }
        >
          Login
        </Link>
      )}
    </nav>
  );
};

export default Navbar;
