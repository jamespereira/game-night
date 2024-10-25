"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import useCurrentUser from "@/hooks/use-current-user";
import { FaUserCircle } from "react-icons/fa";
import LogoutButton from "./LogoutButton";
import { ExitIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import { cn } from "@/lib/utils";

type Props = {
  pathname: string;
};

const UserButton = ({ pathname }: Props) => {
  const user = useCurrentUser();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar className="w-6 h-6">
          <AvatarImage src={user?.image || ""} />
          {/* <AvatarFallback className="text-stone-400 bg-color-none"> */}
          <AvatarFallback
            className={cn(
              "bg-color-none",
              "hover:text-stone-100",
              pathname === "/settings" || pathname === "/admin"
                ? "text-stone-100"
                : "text-stone-400"
            )}
          >
            <FaUserCircle className="w-full h-full" />
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-40 align-end">
        <DropdownMenuItem>
          <Link href="/settings">Settings</Link>
        </DropdownMenuItem>
        <LogoutButton>
          <DropdownMenuItem>
            <ExitIcon className="h-4 w-4 mr-2" />
            Logout
          </DropdownMenuItem>
        </LogoutButton>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserButton;
