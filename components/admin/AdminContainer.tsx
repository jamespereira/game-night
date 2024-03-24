"use client";

import React from "react";
import { Card, CardContent, CardHeader } from "../ui/card";
import { Button } from "../ui/button";
import Link from "next/link";
import RoleGate from "../auth/RoleGate";
import FormSuccess from "../FormSuccess";
import GameForm from "./GameForm";
import { usePathname } from "next/navigation";
import { admin } from "@/actions/admin";
import { toast } from "sonner";

type Props = {
  users: any;
};

const AdminPage = ({ users }: Props) => {
  const pathname = usePathname();
  const onServerActionClick = () => {
    admin().then((data) => {
      if (data.error) {
        toast.error(data.error);
      }
      if (data.success) {
        toast.success(data.success);
      }
    });
  };
  const onApiRouteClick = () => {
    fetch("/api/admin").then((response) => {
      if (response.ok) {
        toast.success("Allowed API Route!");
      } else {
        toast.error("Forbidden Api Route!");
      }
    });
  };
  return (
    <Card className="w-[600px]">
      <CardHeader>
        <p className="text-2xl font-semibold text-center">🔑 Admin</p>
      </CardHeader>
      <CardContent className="space-y-4">
        <Button
          asChild
          variant={pathname === "/settings" ? "default" : "outline"}
        >
          <Link href="/settings">Settings</Link>
        </Button>
        <RoleGate allowedRole="ADMIN">
          <FormSuccess message="You are allowed to see this content!" />
        </RoleGate>
        <GameForm users={users} />
        <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-md">
          <p className="text-sm font-medium">Admin-only API Route</p>
          <Button onClick={() => onApiRouteClick()}>Click to test</Button>{" "}
        </div>
        <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-md">
          <p className="text-sm font-medium">Admin-only Server Action</p>
          <Button onClick={() => onServerActionClick()}>
            Click to test
          </Button>{" "}
        </div>
      </CardContent>
    </Card>
  );
};

export default AdminPage;
