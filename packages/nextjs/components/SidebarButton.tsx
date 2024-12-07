import React from "react";
import Link from "next/link";
import { FaCalendarAlt, FaFileInvoice, FaHome, FaUserAlt } from "react-icons/fa";

type SidebarButtonProps = {
  href: string;
  icon: React.ReactNode;
  active: boolean;
  tooltip: string;  // Nueva propiedad para el texto del tooltip
};

const SidebarButton: React.FC<SidebarButtonProps> = ({ href, icon, active, tooltip }) => {
  return (
    <Link
      href={href}
      className={`w-16 h-16 flex items-center justify-center transition-all duration-300 ease-in-out 
      ${active ? "bg-[#0fa3a0] text-white" : "bg-white text-[#0fa3a0]"} 
      rounded-full cursor-pointer`}
      title={tooltip}  // Aquí añadimos el título que se verá como el tooltip
    >
      {icon}
    </Link>
  );
};

export default SidebarButton;
