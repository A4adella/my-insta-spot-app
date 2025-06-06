

import React, { useState, useRef, useEffect } from "react";

const EditProfileModal = ({ isOpen, onClose, currentName, currentProfession, currentImage, onSave }) => {
  const [fullName, setFullName] = useState('');
  const [profession, setProfession] = useState('');
  const [imagePreview, setImagePreview] = useState(null);
  const imageInputRef = useRef(null);
  const modalRef = useRef(null);
  const firstInputRef = useRef(null);

  // Reset modal fields when opened
  useEffect(() => {
    if (isOpen) {
      setFullName(currentName || '');
      setProfession(currentProfession || '');
      setImagePreview(currentImage || null);
      // Focus on first input after slight delay
      setTimeout(() => {
        firstInputRef.current?.focus();
      }, 0);
    }
  }, [isOpen, currentName, currentProfession, currentImage]);

  // Close modal on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && event.target === modalRef.current) {
        onClose();
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [onClose]);

  // Close modal on Escape key
  useEffect(() => {
    const handleEsc = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };
    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function (e) {
        setImagePreview(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const toTitleCase = (str) =>
      str.replace(/\w\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase());

    const capitalizedName = toTitleCase(fullName);
    const capitalizedProfession = toTitleCase(profession);

    onSave({
      name: capitalizedName,
      profession: capitalizedProfession,
      image: imagePreview
    });

    onClose();
  };

  if (!isOpen) return null;

  return (
    <div ref={modalRef} className="modal-overlay">
      <div className="modal-content">
        <div className="ep-overlayHeader">
          <h3>Edit Profile</h3>
          <button className="close-btn" onClick={onClose}>
            <span><img src="./Icons/Icon_close.svg" alt="close" /></span>
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="ep-overlayBody">
            <div className="ep-form-group">
              <label htmlFor="userName">Full Name</label>
              <input
                type="text"
                id="userName"
                name="username"
                placeholder="Input full name"
                minLength="8"
                maxLength="54"
                required
                ref={firstInputRef}
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />
            </div>

            <div className="ep-form-group">
              <label htmlFor="professionInput">Profession</label>
              <input
                type="text"
                id="professionInput"
                name="profession"
                placeholder="Input profession"
                minLength="8"
                maxLength="100"
                required
                value={profession}
                onChange={(e) => setProfession(e.target.value)}
              />
            </div>

            <div className="ep-form-group">
              <label htmlFor="imageInput">Upload Image</label>
              <input
                type="file"
                id="imageInput"
                name="profileImage"
                accept="image/*"
                ref={imageInputRef}
                onChange={handleImageChange}
              />
            </div>

            {imagePreview && (
              <div className="ep-form-group">
                <label>Image Preview</label>
                <img
                  id="imagePreview"
                  style={{ maxWidth: '80px', marginTop: '10px' }}
                  alt="Preview"
                  src={imagePreview}
                />
              </div>
            )}

            <div className="ep-overlayButton">
              <button type="submit" className="save-changes-btn">
                Save Changes
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProfileModal;
