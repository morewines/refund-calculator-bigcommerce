import React from 'react';

//CSS
import './MathButton.css';

const MathButton = ({ buttonText, handleMath }) => {
  const handleClick = evt => {
    handleMath();
  };

  return (
    <a className="button math-button" onClick={handleClick}>
      {buttonText}
    </a>
  );
};

export default MathButton;
