import { useState } from "react";
import "./App.css";
import image from "./assets/image.jpeg";

function App() {
  const [noPosition, setNoPosition] = useState({ top: "50%", left: "50%" });

  const moveNoButton = () => {
    const newTop = Math.random() * 80 + "%";
    const newLeft = Math.random() * 80 + "%";
    console.log("Nueva posición:", { top: newTop, left: newLeft });
    setNoPosition({ top: newTop, left: newLeft });
  };

  return (
    <div className="container">
      <h1>Quieres ser mi San Valentín? ❤️</h1>
      <img src={image} alt="San Valentín" className="photo" />
      <div className="buttons">
        <button className="yes">Sí ❤️</button>
        <button
          className="no"
          style={{ top: noPosition.top, left: noPosition.left }}
          onMouseEnter={moveNoButton}
        >
          No 💔
        </button>
      </div>
    </div>
  );
}

export default App;