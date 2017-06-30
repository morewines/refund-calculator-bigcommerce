import React from 'react';

//CSS
import './Button.css';

const Button = ({buttonText}) => {

  return (
    <a className="button button-mw">{buttonText}</a>
  )
}

export default Button;
