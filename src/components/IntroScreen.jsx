import PropTypes from "prop-types";
import "./IntroScreen.css";

const IntroScreen = ({ startValentineScreen }) => {
  return (
    <div className="intro">
      <div className="letter">
        <p>Tengo algo que pedirte... 💌</p>
        <p>¿Quieres saber qué es? 🤭</p>
        <button className="yes" onClick={startValentineScreen}>Sí, dime! 💖</button>
      </div>
    </div>
  );
};

IntroScreen.propTypes = {
  startValentineScreen: PropTypes.func.isRequired
};

export default IntroScreen;