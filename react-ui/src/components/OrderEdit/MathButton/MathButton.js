import React from 'react';

//CSS
import './MathButton.css';

const MathButton = ({buttonText, handleMath}) => {

  const handleClick = (evt) => {
    handleMath();
  }

  return (
    <button className="math-button" onClick={handleClick}>
      {buttonText}
    </button>
  )
}

export default MathButton;
