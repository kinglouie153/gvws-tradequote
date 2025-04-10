// src/components/Modal.jsx
import React from 'react';

const Modal = ({ open, onClose, children }) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-4 rounded-xl shadow-lg w-full max-w-md">
        <button className="float-right text-gray-600" onClick={onClose}>✕</button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
