import React from "react";
import EditProfileModal from "./EditProfileModal";
import { useState } from "react";
import NewPostModal from "./NewPostModal";

const AvatarSection = () => {
const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);
 const [profile, setProfile] = useState({
    name: " Bessie Coleman",
    profession: "Civil Aviator",
    image: "./Images/Avatar.png",
  });
  const handleEditSave = (updatedProfile) => {
    setProfile(updatedProfile);
  };


  return (
    <section className="hero-section">
      <figure className="avatar-container">
        <div className="avatar__img-container">
          <img
            className="avatar"
            src="/Images/Avatar.png"
            alt="User Avatar"
            id="profileImage"
          />
        </div>
        <figcaption className="avatar-info">
          <div className="avatar-text">
            <h2 className="truncate">{profile.name}</h2>
            <p className="truncate">{profile.profession}</p>
          </div>

          <button className="edit-profile-btn" onClick ={()=> setIsEditProfileOpen(true)}>
            <img
              src="Icons/Icon_edit.svg"
              width="16"
              height="16"
              viewBox="0 0 18 10"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            />
            <rect
              x="13.0676"
              y="4.5451"
              width="11.6506"
              height="3.21396"
              transform="rotate(135 13.0676 4.5451)"
              fill="#212121"
            />
            <path
              d="M14.2036 1.13628C14.8312 1.76384 14.8312 2.78132 14.2036 3.40889L13.6354 3.97704L11.3628 1.70443L11.931 1.13628C12.5586 0.508714 13.576 0.508714 14.2036 1.13628Z"
              fill="#212121"
            />
            <path
              d="M1.54021 13.1538L2.55674 10.5108L4.82935 12.7834L2.18637 13.8C1.782 13.9555 1.38468 13.5582 1.54021 13.1538Z"
              fill="#212121"
            />
            Edit Profile
          </button>
          <EditProfileModal
            isOpen={isEditProfileOpen}
            onClose={() => setIsEditProfileOpen(false)}
            currentName={profile.name}
            currentProfession={profile.profession}
            currentImage={profile.image}
            onSave={handleEditSave} />
        </figcaption>
      </figure>
    </section>
  );
};

export default AvatarSection;
