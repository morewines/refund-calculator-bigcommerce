import React from 'react';

//CSS
import './MathButton.css';

const MathButton = ({buttonText, editSubtract, handleEditClick}) => {

  return (
    <button className="math-button" onClick={handleEditClick}>
      {buttonText}
    </button>
  )
}

export default MathButton;
