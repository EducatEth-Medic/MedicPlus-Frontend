"use client";

import React, { useCallback, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { SwitchTheme } from "./SwitchTheme";
import { useTheme } from "next-themes";
import { hardhat } from "viem/chains";
import { Bars3Icon, BugAntIcon } from "@heroicons/react/24/outline";
import { FaucetButton, RainbowKitCustomConnectButton } from "~~/components/scaffold-eth";
import { useOutsideClick, useTargetNetwork } from "~~/hooks/scaffold-eth";

type HeaderMenuLink = {
  label: string;
  href: string;
  icon?: React.ReactNode;
};

export const menuLinks: HeaderMenuLink[] = [
  {
    label: "Home",
    href: "/",
  },

  {
    label: "Debug Contracts",
    href: "/debug",
    icon: <BugAntIcon className="h-4 w-4" />,
  },
];

/**
 * Site header
 */
export const Header = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const burgerMenuRef = useRef<HTMLDivElement>(null);
  const { resolvedTheme } = useTheme();
  const pathname = usePathname();

  const { targetNetwork } = useTargetNetwork();
  const isLocalNetwork = targetNetwork.id === hardhat.id;

  useOutsideClick(
    burgerMenuRef,
    useCallback(() => setIsDrawerOpen(false), []),
  );

  // Obtener solo la parte final de la URL (la página actual)
  const currentPage = pathname.split("/").pop()?.replace(/-/g, " ") || "Home";

  return (
    <div className="sticky top-0 navbar bg-transparent h-[100px] flex-shrink-0 justify-between z-20 w-full px-4 sm:px-6">
      {/* Cápsula con el nombre de la página actual */}
      <div className="navbar-start flex items-center">
        <div className="h-[42.97px] flex items-center justify-center bg-[#0fa3a0] text-white rounded-full px-6 py-2">
          <span className="text-sm">{currentPage}</span>
        </div>
      </div>

      {/* Contenedor del Logo centrado */}
      <div className="navbar-center flex items-center justify-center w-full max-w-screen-sm mx-auto">
        <div
          className={`relative h-[42.97px] flex justify-center items-center rounded-full border-2 border-[#0fa3a0] px-4 
                      ${resolvedTheme === "dark" ? "bg-gray-800" : "bg-white"}`}
        >
          <Image
            alt="Medic+ logo"
            className="cursor-pointer"
            width={50}
            height={50}
            src={resolvedTheme === "dark" ? "/logo-dark.png" : "/logo.png"}
            style={{ objectFit: "contain", width: "auto", height: "auto" }}
          />
        </div>
      </div>

      {/* Contenedor de los botones de la derecha */}
      <div className="navbar-end flex-grow mr-4 gap-10">
        <SwitchTheme className={`pointer-events-auto ${isLocalNetwork ? "self-end md:self-auto" : ""}`} />
        <RainbowKitCustomConnectButton />
        <FaucetButton />
      </div>
    </div>
  );
};
