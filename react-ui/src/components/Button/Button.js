import React from 'react';

//CSS
import './Button.css';

const Button = ({icon, buttonText, extraClass}) => {

  return (
    <a className={"button button-mw " + extraClass}>
      {icon}
      {buttonText}
    </a>
  )
}

export default Button;
