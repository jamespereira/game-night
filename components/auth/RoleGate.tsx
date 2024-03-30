"use client";
import { useCurrentRole } from "@/hooks/use-current-role";
import { UserRole } from "@prisma/client";
import React from "react";
import FormError from "../FormError";

type Props = {
  children: React.ReactNode;
  allowedRole: UserRole;
};

const RoleGate = ({ children, allowedRole }: Props) => {
  const role = useCurrentRole();
  if (role !== allowedRole) {
    // return (
    //   <FormError message="You do not have permission to view this content!" />
    // );
    return false;
  }

  return <>{children}</>;
};

export default RoleGate;
