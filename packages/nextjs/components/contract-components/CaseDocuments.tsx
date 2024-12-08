import React, { useEffect, useState } from "react";
import GenericModal from "../GenericModal";
import { useAccount } from "wagmi";
import { notification } from "~~/utils/scaffold-eth";
import Report from "../Report";

export const CaseDocuments = ({ caseId, patientAddress }: { caseId: string; patientAddress: string }) => {
  const [data, setData] = useState<{ result: any[] }>();
  const [isLoading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isReportViewerOpened, setReportViewerOpened] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [documentName, setDocumentName] = useState("");
  const [documentDescription, setDocumentDescription] = useState("");
  const [isDataUploading, setDataUploading] = useState(false);
  const [documentCID, setDocumentCID] = useState("");

  const URL = process.env.NEXT_PUBLIC_API_URL;
  const PATH_GET = "/get-case/";
  const PATH_UPLOAD = "/upload-case";

  const { isConnected } = useAccount();

  const handleOpenModal = () => {
    if (!isConnected) {
      notification.warning("Por favor, conecte su wallet para continuar");
      return;
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleOpenModalReport = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!isConnected) {
      notification.warning("Por favor, conecte su wallet para continuar");
      return;
    }
    setReportViewerOpened(true);
  };

  const handleCloseModalReport = () => {
    setReportViewerOpened(false);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setSelectedFile(event.target.files[0]);
      // alert("Archivo seleccionado: " + event.target.files[0].name);
    }
  };

  const handleFileUpload = async () => {
    if (selectedFile) {
      try {
        setDataUploading(true);

        // console.log("Subiendo archivo a IPFS...");
        const data = new FormData();
        data.append("file", selectedFile);

        const pinataUrl = "https://api.pinata.cloud/pinning/pinFileToIPFS";

        const pinataJwt = process.env.NEXT_PUBLIC_PINATA_JWT;

        // Hacemos la solicitud POST para subir el archivo
        const response = await fetch(pinataUrl, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${pinataJwt}`,
          },
          body: data,
        });

        // Procesamos la respuesta de la API de Pinata
        if (response.ok) {
          const responseData = await response.json();
          const cid = responseData.IpfsHash; // CID del archivo subido
          // console.log("Archivo subido con éxito. CID:", cid);
          console.log(`Archivo subido a IPFS con CID: ${cid}`);

          await handleUploadCase(cid);
          // console.log(`Documento subido a arbitrum con CID: ${cid}`);

          // alert(`Archivo subido con exitosamente`);
        } else {
          console.error("Error al subir el archivo:", response.statusText);
          notification.error("Error al subir el archivo.");
        }
      } catch (error) {
        console.error("Error al subir el archivo:", error);
        notification.error("Error al subir el archivo.");
      }
    } else {
      notification.warning("No se seleccionó ningún archivo.");
    }
    setDataUploading(false);
    handleCloseModal(); // Cierra el modal después de subir el archivo
  };

  // Arrow function para llamar a api upload-case (parametros: cid)
  const handleUploadCase = async (cid: string) => {
    try {
      const uploadData = {
        cid: cid,
        name: documentName,
        description: documentDescription,
        patient: patientAddress,
        issueDate: BigInt(Date.now()).toString(),
      };

      const uploadResponse = await fetch(URL + PATH_UPLOAD, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          accept: "*/*",
        },
        body: JSON.stringify(uploadData), // Convertimos el objeto a JSON
      });

      if (uploadResponse.ok) {
        const uploadResponseData = await uploadResponse.json();
        setDocumentCID(cid);
        console.log("Caso subido con éxito:", uploadResponseData);
        notification.success("Documento subido exitosamente al caso.");
      } else {
        console.error("Error al subir el caso:", uploadResponse.statusText);
        notification.error("Error al subir el caso.");
      }
    } catch (error) {
      console.error("Error al subir el archivo:", error);
      throw error;
    }
  };

  // console.log(URL + PATH + caseId);
  useEffect(() => {
    fetch(URL + PATH_GET + caseId)
      .then(res => res.json())
      .then(data => {
        setData(data);
        setLoading(false);
      });
  }, [caseId, documentCID]);

  if (isLoading) return <p>Cargando lista de documentos...</p>;
  if (!data) return <p>El caso no tiene documentos aún...</p>;
  // console.log(data);

  // console.log(data.result);
  // const caso: caseObject = data;
  // console.log(caso);

  if (typeof data === "undefined") return <p>El caso {caseId} no existe...</p>;

  return (
    <div className={`w-[95%] h-[90%]`}>
      <div className="flex justify-between items-center mb-4">
        <h1 className="font-bold text-xl">Documentos del paciente:</h1>

        <button
          className="flex items-center justify-center p-2 bg-[#0fa3a0] text-white rounded-full hover:bg-[#1b81ae] transition-colors duration-200"
          onClick={handleOpenModal}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="35"
            height="35"
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
        {data.cids.map((cid: string, index: number) => {
          return (
            <div key={index} className="bg-white p-4 rounded-lg shadow-md relative">
              <div className="flex flex-col items-start">
                <strong className="text-sm font-medium">Cid:</strong>
                <span className="text-sm text-gray-500">{cid}</span>
              </div>
              {isConnected && (
                <a
                  className="mt-2 btn btn-primary"
                  href={`https://ipfs.io/ipfs/${cid}`}
                  onClick={handleOpenModalReport}
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
              )}
            </div>
          );
        })}
      </div>

      <GenericModal isOpen={isModalOpen} onClose={handleCloseModal} title="Agregar nuevo documento">
        <div>
          <div>
            <div className="mt-4">
              {/* Dirección del paciente */}
              <label className="block text-sm font-medium text-gray-700">Dirección del paciente</label>
              <span className="block w-full text-sm text-gray-500 mt-2 mb-5">{patientAddress}</span>
            </div>

            {/* Nombre del documento */}
            <label className="block text-sm font-medium text-gray-700">Nombre del documento</label>
            <input
              type="text"
              value={documentName}
              onChange={e => setDocumentName(e.target.value)} // Guardar el nombre del documento en el estado
              className="block w-full text-sm text-gray-500 border border-gray-300 rounded-md mt-2 mb-5"
              placeholder="Ingrese el nombre del documento"
              required
            />
          </div>

          <div className="mt-4">
            {/* Descripción del documento */}
            <label className="block text-sm font-medium text-gray-700">Descripción del documento</label>
            <textarea
              value={documentDescription}
              onChange={e => setDocumentDescription(e.target.value)} // Guardar la descripción en el estado
              className="block w-full text-sm text-gray-500 border border-gray-300 rounded-md mt-2 mb-5"
              placeholder="Ingrese una descripción del documento"
              required
            />
          </div>

          <div className="mt-4 flex justify-between items-center">
            <input
              type="file"
              onChange={handleFileChange}
              className="block w-full text-sm text-gray-500 border border-gray-300 rounded-md mb-5"
              required
            />
          </div>
          <div className="flex justify-end">
            <button
              onClick={handleFileUpload}
              className="mt-4 p-2 bg-[#0fa3a0] text-white rounded-md hover:bg-[#1b81ae] transition-colors"
            >
              Subir documento
            </button>
          </div>
        </div>
      </GenericModal>
      <GenericModal isOpen={isReportViewerOpened} onClose={handleCloseModalReport} title="Informe Medico">
        <Report />
      </GenericModal>

      {isDataUploading && (
        <div className="flex justify-center items-center">
          <div className="w-16 h-16 border-4 border-t-4 border-gray-200 border-solid rounded-full animate-spin border-t-[#0fa3a0]"></div>
        </div>
      )}
    </div>
  );
};
