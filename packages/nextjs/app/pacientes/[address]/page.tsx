"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { CaseDocuments } from "~~/components/contract-components/CaseDocuments";

export default function PacientePage() {
  const { address } = useParams(); // Usamos useParams para obtener el parámetro dinámico 'address' desde la URL
  const [walletInfo, setWalletInfo] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // Verificamos si la dirección de la wallet está disponible
  useEffect(() => {
    if (address) {
      fetch(`/api/wallets/${address}`)
        .then(response => response.json())
        .then(data => {
          setWalletInfo(data);
          setLoading(false);
        })
        .catch(error => {
          console.error("Error al obtener la información de la wallet:", error);
          setLoading(false);
        });
    }
  }, [address]);

  if (!address) {
    return <div>Esperando dirección de la wallet...</div>;
  }

  if (loading) {
    return <div>Cargando...</div>;
  }

  if (!walletInfo) {
    return <div>No se encontró información para esta dirección.</div>;
  }

  return (
    <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
      <div className="w-full flex-none md:w-64 padding: 2rem">
        <h1 style={{ fontWeight: "bold", fontSize: "1.75rem" }}>Paciente: {walletInfo.name}</h1>
        <div>
          <img src={walletInfo.photo} alt="Foto del paciente" style={{ width: "200px", height: "200px" }} />
        </div>
        <p>
          <strong>Edad:</strong> {walletInfo.age} años
        </p>
      </div>
      <div className="flex-grow p-6 md:overflow-y-auto md:p-12">
        <CaseDocuments caseId="5" />
      </div>
    </div>
  );
};
