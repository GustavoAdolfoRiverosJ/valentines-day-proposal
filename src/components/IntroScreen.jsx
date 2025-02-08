import PropTypes from "prop-types";
import "./IntroScreen.css";
import { useState } from "react";

const IntroScreen = ({ startValentineScreen }) => {
  const [hide, setHide] = useState(false);

  const handleClick = () => {
    setHide(true);
    setTimeout(startValentineScreen, 1000);
  };

  return (
    <div className="intro">
      <div className={`letter ${hide ? "hide" : ""}`}>
        <p>Tengo algo que pedirte... 💌</p>
        <p>¿Quieres saber qué es? 🤭</p>
        <button className="yes" onClick={handleClick}>Sí, dime! 💖</button>
      </div>
    </div>
  );
};

IntroScreen.propTypes = {
  startValentineScreen: PropTypes.func.isRequired
};

export default IntroScreen;