import { useEffect, useState } from "react";
import "./App.css";
import IntroScreen from "./components/IntroScreen";
import image from "./assets/image.jpeg";
import errorSound from "./assets/error-sound.wav";
import backgroundMusic from "./assets/background-music.mp3";

function App() {
  const [showIntro, setShowIntro] = useState(true);
  const [showProposal, setShowProposal] = useState(false);
  const [showFinalMessage, setShowFinalMessage] = useState(false); // Estado para mostrar el mensaje final
  const [hearts, setHearts] = useState([]); // Estado para almacenar los corazones de fondo
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

    generateFloatingHearts();

    setTimeout(() => {
      setShowProposal(true);
    }, 1000);
  };

  const generateFloatingHearts = () => {
    const heartsArray = Array.from({ length: 20 }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}vw`,
      animationDuration: `${Math.random() * 5 + 3}s`,
      delay: `${Math.random() * 3}s`,
      size: `${Math.random() * 20 + 10}px`, // Tamaños aleatorios entre 10px y 30px
    }));
    setHearts(heartsArray);
  };

  const messages = [
    "Piénsalo bien! 😏. No es la respuesta correcta",
    "¿Estás segura? 🥺. No es la respuesta correcta",
    "No lo hagas! 💔. No es la respuesta correcta",
  ];

  const moveNoButton = () => {
    const newTop = Math.random() * 80 + "%";
    const newLeft = Math.random() * 80 + "%";
    setNoPosition({ top: newTop, left: newLeft });
  };

  const handleNoClick = () => {
    moveNoButton();
    setNoMessage(messages[Math.floor(Math.random() * messages.length)]);
    setShowPopup(true);
    new Audio(errorSound).play();
    setTimeout(() => {
      setShowPopup(false);
    }, 2000);
  };

  const handleYesClick = () => {
    const heartsContainer = document.createElement("div");
    heartsContainer.classList.add("hearts-click-container");
    document.body.appendChild(heartsContainer);

    for (let i = 0; i < 50; i++) {
      const heart = document.createElement("div");
      heart.classList.add("heart-click");
      heart.style.left = `${Math.random() * 100}vw`;
      heart.style.animationDuration = `${Math.random() * 2 + 1}s`;
      heart.style.width = `${Math.random() * 30 + 10}px`; // Tamaño aleatorio entre 10px y 40px
      heart.style.height = heart.style.width;
      heartsContainer.appendChild(heart);
    }

    setTimeout(() => {
      heartsContainer.remove();
      setShowFinalMessage(true);
    }, 5000);
  };


  return (
    <>
      {showIntro ? (
        <IntroScreen startValentineScreen={startValentineScreen} />
      ) : (
        <>
          <div className="hearts-background">
            {hearts.map((heart) => (
              <div
                key={heart.id}
                className="heart-floating"
                style={{
                  left: heart.left,
                  animationDuration: heart.animationDuration,
                  animationDelay: heart.delay,
                  width: heart.size,
                  height: heart.size,
                }}
              ></div>
            ))}
          </div>

          {/* ❤️ Contenedor de la propuesta */}
          {!showFinalMessage ? (
            <div className={`container ${showProposal ? "show" : ""}`}>
              <h1>Te gustaría ser mi San Valentín? ❤️</h1>
              <img src={image} alt="San Valentín" className="photo" />
              <div className="buttons">
                <button className="yes" onClick={handleYesClick}>
                  Sí ❤️
                </button>
                <button
                  className="no"
                  style={{
                    position: "absolute",
                    top: noPosition.top,
                    left: noPosition.left,
                  }}
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
          ) : (
            <div className="final-message">
              <p>💖 ¡Gracias por ser mi San Valentín! 💖</p>
              <p>💖 Te quiero mucho, Marianita 💖</p>
              <img
                src="https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExd2g1NWluNjM0aHoxNDFubjlmZjBhMjl3emRuZmo3MHI5bXFwbXU0YSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/3oriO6qJiXajN0TyDu/giphy.gif"
                alt="San Valentín"
                className="final-gif"
              />
            </div>
          )}
        </>
      )}
    </>
  );
}

export default App;