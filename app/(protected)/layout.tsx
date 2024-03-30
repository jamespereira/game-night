import React from "react";
import Navbar from "./_components/_navbar";

type Props = {
  children: React.ReactNode;
};

const ProtectedLayout = ({ children }: Props) => {
  return (
    <div className="min-h-[calc(100%-60px)] w-full flex flex-col gap-y-10 items-center pt-20 bg-[#163749] px-6 sm:px-8 md:px-10">
      {/* <Navbar /> */}
      {children}
    </div>
  );
};

export default ProtectedLayout;
