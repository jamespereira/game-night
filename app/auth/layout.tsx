import React from "react";

type Props = {
  children: React.ReactNode;
};
const authLayout = ({ children }: Props) => {
  return (
    <div className="min-h-[calc(100%-60px)] flex items-center justify-center  bg-gradient-to-r from-black/90 from-20% to-sky-900/75 px-4 sm:px-6 md:px-8">
      {children}
    </div>
  );
};

export default authLayout;
