import type { ReactNode } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
}

const Modal = ({ isOpen, onClose, title, children }: ModalProps) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-96">
        {title && <h2 className="text-lg font-bold mb-4">{title}</h2>}
        {children}
        <button
          onClick={onClose}
          className="mt-4 px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default Modal;