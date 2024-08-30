import React from 'react';
import { IoMdClose } from "react-icons/io";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  message: string;
  children: React.ReactNode; // Add children prop
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, message, children }) => {
  if (!isOpen) return null;

  return (
    <div className='flex flex-col p-4 relative'>
      <div>
        <h2>{title}</h2>
        <p>{message}</p>
        <button className="absolute top-4 left-4" onClick={onClose}><IoMdClose className='text-lg' color='red' /></button>
        {children} {/* Render children here */}
      </div>
    </div>
  );
};

export default Modal;
