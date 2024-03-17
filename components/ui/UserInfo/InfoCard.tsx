import React from "react";

type Props = {
  label: string;
  children: React.ReactNode;
};

const InfoCard = ({ label, children }: Props) => {
  return (
    <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
      <p className="text-sm font-medium">{label}</p>
      <div className="truncate text-xs max-w-[180px] font-mono bg-slate-100 rounded-md">
        {children}
      </div>
    </div>
  );
};

export default InfoCard;
