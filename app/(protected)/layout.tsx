import React from "react";
import Navbar from "./_components/_navbar";

type Props = {
  children: React.ReactNode;
};

const ProtectedLayout = ({ children }: Props) => {
  return (
    <div className="h-full w-full flex flex-col gap-y-10 items-center justify-center bg-stone-800">
      {/* <Navbar /> */}
      {children}
    </div>
  );
};

export default ProtectedLayout;
