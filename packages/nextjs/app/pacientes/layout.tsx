"use client";

import { ReactNode } from "react";
import { DetailsContainer } from "~~/components/DetailsContainer";

const PacientesLayout = ({ children }: { children: ReactNode }) => {
  return <DetailsContainer>{children}</DetailsContainer>;
};

export default PacientesLayout;
