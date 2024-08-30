import React from "react";
import { IoMdClose } from "react-icons/io";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  message: string;
  id: string;
  children: React.ReactNode; // Add children prop,
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  message,
  children,
  id,
  ...rest
}) => {
  return (
    <div className="flex flex-col p-4 relative modal" id={id} {...rest}>
      <div className="modal-box">
        <h2>{title}</h2>
        <p>{message}</p>
        <button className="absolute top-4 left-4" onClick={onClose}>
          <IoMdClose className="text-lg" color="red" />
        </button>
        {children} {/* Render children here */}
      </div>
    </div>
  );
};

export default Modal;
