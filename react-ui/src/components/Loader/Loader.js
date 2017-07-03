import React from 'react';

//CSS
import './Loader.css';

/**
 * Loader written by brunjo @ https://codepen.io/brunjo/details/wBKmbm/
 */
const Loader = ({extraClass}) => (
  <div className={"loading "+ extraClass}>
    <div className="loading-bar"></div>
    <div className="loading-bar"></div>
    <div className="loading-bar"></div>
    <div className="loading-bar"></div>
  </div>
)

export default Loader;
