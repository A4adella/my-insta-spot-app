import React from "react";
import { useState } from "react";
import ImagePreviewModal from "./ImagePreviewModal";

const PostGrid = ({ cards, setCards }) => {
  const [previewImage, setPreviewImage] = useState(null);
  const [previewTitle, setPreviewTitle] = useState("");
  const [isImagePreviewOpen, setIsImagePreviewOpen] = useState(false);

  const handleLike = (index) => {
    setCards((prevCards) =>
      prevCards.map((card, i) =>
        i === index ? { ...card, liked: !card.liked } : card
      )
    );
  };

  const handleImageClick = (image, title) => {
    setPreviewImage(image);
    setPreviewTitle(title);
    setIsImagePreviewOpen(true);
  };

  return (
    <>
    <section className="section-grid">
      {cards.map((card, index) => (
        <div key={index} className="each-card">
          <div className="cardImg-div">
            <img src={card.image} alt={card.title} className="card-img" onClick={()=> handleImageClick(card.image, card.title)} />
          </div>
          <div className="text-icon">
            <p>{card.title}</p>
            <svg
              className="heart-icon"
              onClick={() => handleLike(index)}
              xmlns="http://www.w3.org/2000/svg"
              width="25"
              height="30"
              fill={card.liked ? "red" : "grey"}
              stroke="black"
              viewBox="0 0 256 256"
              style={{ cursor: "pointer" }}
            >
              <path d="M223,57a58.07,58.07,0,0,0-81.92-.1L128,69.05,114.91,56.86A58,58,0,0,0,33,139l89.35,90.66a8,8,0,0,0,11.4,0L223,139a58,58,0,0,0,0-82Zm-11.35,70.76L128,212.6,44.3,127.68a42,42,0,0,1,59.4-59.4l.2.2,18.65,17.35a8,8,0,0,0,10.9,0L152.1,68.48l.2-.2a42,42,0,1,1,59.36,59.44Z"></path>
            </svg>
          </div>
        </div>
      ))}
    </section>

    <ImagePreviewModal 
    isOpen={isImagePreviewOpen}
    image={previewImage}
    title={previewTitle}
    onClose={() => setIsImagePreviewOpen(false)} />
    </>
  );
};

export default PostGrid;
