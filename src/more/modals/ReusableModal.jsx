import React from "react";
import "../modals/Modal.css"; // Adjust path as needed

const ReusableModal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div className="custom-modal-overlay">
      <div className="custom-modal-content">
        <button className="custom-modal-close" onClick={onClose}>
          &times;
        </button>
        <h2>{title}</h2>
        <div className="custom-modal-form">{children}</div>
      </div>
    </div>
  );
};

export default ReusableModal;
