

import React, { useState, useEffect , useRef } from "react";

const NewPostModal = ({ isOpen, onClose, onPostUpload }) => {
  const [title, setTitle] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [error, setError] = useState("");
  const modalRef = useRef(null);



  // Close modal when pressing Escape key
  useEffect(() => {
    const handleEsc = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };
    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  if (!isOpen) return null;

  const handleImageChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim() || title.length < 8) {
      setError("Title must be at least 8 characters");
      return;
    }
    if (!imageFile) {
      setError("Please upload an image");
      return;
    }
    const imageUrl = URL.createObjectURL(imageFile);

    onPostUpload({
      title: title.charAt(0).toUpperCase() + title.slice(1),
      image: imageUrl,
      liked : false,
    });
    setTitle("");
    setImageFile(null);
    setError("");
    onClose();
  };
 

  return (
    <div
      className="newPostModal"
      ref={modalRef}
  onClick={(e) => {if (e.target === e.currentTarget ) {onClose()}}}
    >
      <div className="newPostModal__wrapper">
        <div className="newPostModal-content">
          <div className="overlayHeader">
            <h3>New post</h3>
            <button className="newPostcloseBtn" onClick={onClose}>
              <span>
                <img src="./Icons/Icon_close.svg" alt="close" />
              </span>
            </button>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="overlayBody">
              <div className="form-group">
                <label htmlFor="postTitle">Post title</label>
                <input
                  type="text"
                  id="postTitle"
                  placeholder="Input title"
                  minLength="8"
                  maxLength="20"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  autoFocus
                />
              </div>
              <div className="form-group">
                <label htmlFor="uploadImage">Upload Image</label>
                <input
                  type="file"
                  id="imageUpload"
                  accept="image/*"
                  onChange={handleImageChange}
                />
              </div>

              {error && <p className="error-message">{error}</p>}

              <div className="overlayButton">
                <button className="upload-btn" type="submit">
                  Upload post
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default NewPostModal;
