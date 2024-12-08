type GenericModalProps = {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
};

const GenericModal = ({ isOpen, onClose, title, children }: GenericModalProps) => {
  if (!isOpen) return null; // Si el modal no está abierto, no renderiza nada

  return (
    <div className="fixed inset-0 z-50 flex justify-center items-center">
      {/* Capa de fondo oscura */}
      <div className="absolute inset-0 bg-black bg-opacity-50" onClick={onClose}></div>

      {/* Contenido del modal */}
      <div className="bg-white p-6 rounded-lg w-full max-w-md relative z-10">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">{title}</h2>
          <button className="text-gray-500" onClick={onClose}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="currentColor"
              className="bi bi-x"
              viewBox="0 0 16 16"
            >
              <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 6.293l2.646-2.647a.5.5 0 1 1 .708.708L8.707 7l2.647 2.646a.5.5 0 1 1-.708.708L8 7.707l-2.646 2.647a.5.5 0 1 1-.708-.708L7.293 7 4.646 4.354a.5.5 0 0 1 0-.708z" />
            </svg>
          </button>
        </div>

        <div>{children}</div>
      </div>
    </div>
  );
};

export default GenericModal;
