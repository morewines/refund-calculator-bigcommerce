import React from 'react';

// CSS
import './Button.css';

const Button = ({ icon, buttonText, extraClass, handleClick }) => {
  return (
    <a className={'button button-mw ' + extraClass} onClick={handleClick}>
      {icon}
      {buttonText}
    </a>
  );
};

export default Button;
