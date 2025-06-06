import React from "react";
import { useState } from "react";
import Navbar from "./components/Navbar";
import AvatarSection from "./components/AvatarSection";
import EditProfileModal from "./components/EditprofileModal";
import NewPostModal from "./components/NewPostModal";
import PostGrid from "./components/PostGrid";

const initialCardsData = [
  {
    image: "/Images/Mask group-5.png",
    title: "Val Thorens",
    liked: false,
  },
  {
    image: "/Images/Mask group-2.png",
    title: "Restaurant-terrace",
    liked: false,
  },
  {
    image: "/Images/Mask group-3.png",
    title: "An outdoor cafe",
    liked: false,
  },
  {
    image: "/Images/Mask group.png",
    title: "A very long bridge over the forest...",
    liked: false,
  },
  {
    image: "/Images/Mask group-1.png",
    title: "Tunnel with morning light",
    liked: false,
  },
  {
    image: "/Images/Mask group-4.png",
    title: "Mountain house",
    liked: false,
  },
];

function App() {
  const [cards, setCards] = useState(initialCardsData);
  const [isNewPostModalOpen, setIsNewPostModalOpen] = useState(false);

  const handleNewPost = (newPost) => {
    setCards((prevCards) => [...prevCards, newPost]);
    setIsNewPostModalOpen(false);
  };
  return (
    <>
      <header>
        <Navbar />
      </header>

      <main>
        <section className="app-section"
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "flex-end",
            justifyContent: "space-between",
            padding: "0px 20px",
            marginRight: "20px",
          }}
        >
          <AvatarSection />
          <button
            id="newPostBtn"
            className="newPostBtn"
            onClick={() => setIsNewPostModalOpen(true)}
          >
            <span>
              <img src="./Icons/Icon_add.svg" alt="add" />
            </span>
            <span>New Post</span>
          </button>
        </section>
        <NewPostModal
          isOpen={isNewPostModalOpen}
          onClose={() => setIsNewPostModalOpen(false)}
          onPostUpload={handleNewPost}
        />
        <PostGrid cards={cards} setCards={setCards} />
      </main>

      <footer className="site-footer">2023 &copy; Spots</footer>
    </>
  );
}

export default App;
