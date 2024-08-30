import React from 'react';
import { IoMdClose } from "react-icons/io";
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  message: string;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, message }) => {
  if (!isOpen) return null;

  return (
    <div className='flex flex-col p-4 relative'>
      <div>
        <h2>{title}</h2>
        <p>{message}</p>
        <button className="absolute top-4 left-4" onClick={onClose}><IoMdClose className='text-lg' color='red' /></button>
      </div>
    </div>
  );
};


export default Modal;
