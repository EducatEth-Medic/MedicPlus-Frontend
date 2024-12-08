import React, { useEffect, useState } from "react";
import { useTheme } from "next-themes";

export const CaseDocuments = ({ caseId }: { caseId: string }) => {
  const { resolvedTheme } = useTheme();

  const [data, setData] = useState<{ result: any[] }>();
  const [isLoading, setLoading] = useState(true);

  const URL = process.env.NEXT_PUBLIC_API_URL;
  const PATH = "/get-case/";

  interface caseObject {
    caseId: string;
    issueDate: string;
    cids: string[];
    name: string;
    description: string;
    patientAddress: string;
    exists: boolean;
  }

  useEffect(() => {
    fetch(URL + PATH + caseId)
      .then(res => res.json())
      .then(data => {
        setData(data);
        setLoading(false);
      });
  }, [caseId]);

  if (isLoading) return <p>Cargando lista de documentos...</p>;
  if (!data) return <p>El caso no tiene documentos aún...</p>;
  // console.log(data);

  // console.log(data.result);
  const caso: caseObject = data;
  // console.log(caso);

  if (typeof caso === "undefined") return <p>El caso {caseId} no existe...</p>;

  return (
    <div className={`w-[95%] h-[90%]`}>
      <div className="flex justify-between items-center mb-4">
        <h1 className="font-bold text-xl">Documentos del paciente:</h1>
        <button
          className="flex items-center justify-center p-2 bg-[#0fa3a0] text-white rounded-full hover:bg-[#1b81ae] transition-colors duration-200"
          onClick={() => alert('Agregar nuevo documento')}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            fill="currentColor"
            className="bi bi-plus"
            viewBox="0 0 16 16"
          >
            <path d="M8 7V1h1v6h6v1H9v6H8V8H2V7h6z" />
          </svg>
        </button>
      </div>

      {/* Grilla de CIDs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {caso.cids.map((cid: string, index: number) => {
          return (
            <div
              key={index}
              className="bg-white p-4 rounded-lg shadow-md relative" // Añadimos relative aquí
            >
              <div className="flex flex-col items-start">
                <strong className="text-sm font-medium">Cid:</strong>
                <span className="text-sm text-gray-500">{cid}</span>
              </div>

              {/* Enlace de IPFS */}
              <a
                className="mt-2 btn btn-primary"
                href={`https://ipfs.io/ipfs/${cid}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-eye-fill"
                  viewBox="0 0 16 16"
                >
                  <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z" />
                  <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8zm8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z" />
                </svg>
              </a>
            </div>
          );
        })}
      </div>
    </div>
  );
};
