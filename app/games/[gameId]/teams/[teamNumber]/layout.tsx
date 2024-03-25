import Link from "next/link";
import React from "react";

type Props = {
  children: React.ReactNode;
};

const layout = ({ children }: Props) => {
  return <div className="pt-[80px]">{children}</div>;
};

export default layout;
