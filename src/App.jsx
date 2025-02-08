import { useEffect, useState } from "react";
import "./App.css";
import IntroScreen from "./components/IntroScreen";
import image from "./assets/image.jpeg";
import errorSound from "./assets/error-sound.wav";
import backgroundMusic from "./assets/background-music.mp3";

function App() {
  const [showIntro, setShowIntro] = useState(true);
  const [noPosition, setNoPosition] = useState({ top: "50%", left: "50%" });
  const [noMessage, setNoMessage] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [audio] = useState(new Audio(backgroundMusic));

  useEffect(() => {
    audio.volume = 0.2;
    audio.loop = true;
  }, [audio]);

  const startValentineScreen = () => {
    setShowIntro(false);
    audio.play().catch((err) => console.log("Error al reproducir:", err));
  };

  const messages = ["Piénsalo bien! 😏", "¿Estás segura? 🥺", "No lo hagas! 💔"];

  const moveNoButton = () => {
    const newTop = Math.random() * 80 + "%";
    const newLeft = Math.random() * 80 + "%";
    console.log("Nueva posición:", { top: newTop, left: newLeft });
    setNoPosition({ top: newTop, left: newLeft });
  };

  const handleNoClick = () => {
    moveNoButton();
    setNoMessage(messages[Math.floor(Math.random() * messages.length)]);
    setShowPopup(true);

    const audio = new Audio(errorSound);
    audio.play();

    setTimeout(() => {
      setShowPopup(false);
    }, 2000);
  };

  const handleYesClick = () => {
    const heartsContainer = document.createElement("div");
    heartsContainer.classList.add("hearts-container");
    document.body.appendChild(heartsContainer);

    for (let i = 0; i < 15; i++) {
      const heart = document.createElement("div");
      heart.classList.add("heart");
      heart.style.left = `${Math.random() * 100}vw`;
      heart.style.animationDuration = `${Math.random() * 2 + 1}s`;
      heartsContainer.appendChild(heart);
    }

    setTimeout(() => {
      heartsContainer.remove();
    }, 5000);
  };


  return (
    <>
      {showIntro ? (
        <IntroScreen startValentineScreen={startValentineScreen} />
      ) : (
        <div className="container">
          <h1>Would you like to be my Valentine? ❤️</h1>
          <img src={image} alt="San Valentín" className="photo" />
          <div className="buttons">
            <button className="yes" onClick={handleYesClick}>Sí ❤️</button>
            <button
              className="no"
              style={{ position: "absolute", top: noPosition.top, left: noPosition.left }}
              onMouseEnter={moveNoButton}
              onClick={handleNoClick}
            >
              No 💔
            </button>
          </div>
  
          {showPopup && (
            <div className="popup">
              <p>{noMessage}</p>
            </div>
          )}
        </div>
      )}
    </>
  );
}

export default App;