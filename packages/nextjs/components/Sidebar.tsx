"use client";

import { usePathname } from "next/navigation";
import { FaCalendarAlt, FaFileInvoice, FaHome, FaUserAlt } from "react-icons/fa";
import SidebarButton from "./SidebarButton";

const Sidebar = () => {
  const pathname = usePathname();

  // Función para verificar si la ruta actual corresponde al enlace
  const isActive = (route: string) => pathname === route;

  return (
    <div
      className="fixed top-1/2 left-0 transform -translate-y-1/2 shadow-xl flex flex-col items-center space-y-6"
      style={{
        backgroundColor: "white",
        marginLeft: "39.53px",
        marginRight: "39.53px",
        borderRadius: "100px", // Cápsula con extremos más redondeados
        padding: "16px 8px", // Padding de la cápsula
      }}
    >
      <SidebarButton href="/" icon={<FaHome className="text-2xl" />} active={isActive("/")} tooltip="Resumen" />
      <SidebarButton href="/citas" icon={<FaCalendarAlt className="text-2xl" />} active={isActive("/citas")} tooltip="Citas" />
      <SidebarButton href="/pacientes" icon={<FaUserAlt className="text-2xl" />} active={isActive("/pacientes")} tooltip="Pacientes" />
      <SidebarButton href="/calendario" icon={<FaCalendarAlt className="text-2xl" />} active={isActive("/calendario")} tooltip="Calendario" />
      <SidebarButton href="/facturas" icon={<FaFileInvoice className="text-2xl" />} active={isActive("/facturas")} tooltip="Facturas" />
    </div>
  );
};

export default Sidebar;
