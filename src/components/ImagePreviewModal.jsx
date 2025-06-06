import React from "react";
import { useEffect } from "react";

const ImagePreviewModal = ({ isOpen, image, title, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        onClose(); // Close the modal
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
    
  }, [isOpen, onClose]);

  const handleOverlayClick = (e) => {
     console.log("Clicked target:", e.target);
  console.log("Overlay:", e.currentTarget);
    if (e.target === e.currentTarget) {
      console.log("Overlay clicked");
      onClose(); //close modal when clicking on the overlay
    }
  };

  if (!isOpen) return null;
  console.log("ImagePreviewModal rendered");
  console.log("ImagePreviewModal isOpen:", isOpen);

  return (
    <div className="imageModal" onClick={handleOverlayClick}>
      <div className="modal-inner"onClick={(e) => e.stopPropagation()}>
        <div className="modal-img__container">
          <img src={image} alt={title} className="modal-img" />
        </div>
        <p className="modal-caption">{title}</p>
        <button className="close-btn close-btn__grid" onClick={onClose}>
          &times;
        </button>
      </div>
    </div>
  );
};

export default ImagePreviewModal;
