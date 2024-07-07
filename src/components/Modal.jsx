import React from 'react';

const Modal = ({ onClose, children }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="fixed inset-0 bg-black opacity-50" onClick={onClose}></div>
      <div className="bg-white p-6 rounded shadow-lg z-50">
        {children}
        <button
          onClick={onClose}
          className="absolute top-0 right-0 mt-2 mr-2 text-gray-600"
        >
          &times;
        </button>
      </div>
    </div>
  );
};

export default Modal;
