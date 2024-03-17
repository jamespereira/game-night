import React from "react";

type Props = {
  children: React.ReactNode;
};
const authLayout = ({ children }: Props) => {
  return (
    <div className="h-full flex items-center justify-center bg-slate-600">
      {children}
    </div>
  );
};

export default authLayout;
