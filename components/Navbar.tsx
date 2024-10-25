"use client";

import Link from "next/link";
import React from "react";
import UserButton from "./auth/UserButton";
import { usePathname } from "next/navigation";
import useCurrentUser from "@/hooks/use-current-user";
import { cn } from "@/lib/utils";

const Navbar = () => {
  const pathname = usePathname();

  const user = useCurrentUser();
  return (
    <nav className="h-[60px] sticky top-0 w-full backdrop-blur-sm flex justify-between p-4 items-center border-b border-b-stone-400/50 z-10 text-sm">
      <Link
        href="/"
        className={cn(
          "hover:text-stone-100",
          pathname === "/" ? "text-stone-100" : "text-stone-400"
        )}
      >
        ⚔️ Game Night
      </Link>

      <Link
        href="/stats"
        className={cn(
          "hover:text-stone-100",
          pathname === "/stats" ? "text-stone-100" : "text-stone-400"
        )}
      >
        Stats
      </Link>
      <div className="pl-[4.4rem]">
        {user ? (
          <UserButton pathname={pathname} />
        ) : (
          <Link
            href="/auth/login"
            className={cn(
              "hover:text-stone-100",
              pathname === "/auth/login" ? "text-stone-100" : "text-stone-400"
            )}
          >
            Login
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
