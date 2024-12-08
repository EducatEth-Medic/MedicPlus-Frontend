"use client";

import { useTheme } from "next-themes";
import React from "react";

export const DetailsContainer = ({ children }: { children: React.ReactNode }) => {
  const { resolvedTheme } = useTheme();
  return (
    <div
      className={`w-[80%] h-[90%] rounded-[32.66px] shadow-lg shadow-black/30 p-6 ${resolvedTheme === "dark" ? "bg-gray-700" : "bg-white"}`}
    >
      {children}
    </div>
  );
};
