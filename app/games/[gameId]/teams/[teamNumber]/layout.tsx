import Link from "next/link";
import React from "react";

type Props = {
  children: React.ReactNode;
};

const layout = ({ children }: Props) => {
  return (
    <div className="min-h-[calc(100%-60px)] bg-gradient-to-r from-black/90 from-20% to-sky-900/75">
      {children}
    </div>
  );
};

export default layout;
