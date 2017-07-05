import React from 'react';

//CSS
import './Nav.css';

const Nav = () => {
  return (
    <div className="nav-wrapper">
      <div className="container">
        <h4 className="logo">Partial Refund Calculator
          <sup className="hide-on-small"> for BigCommerce!</sup>
          <sup className="show-on-small-only"> for BC!</sup>
        </h4>
      </div>
    </div>
  )
}

export default Nav;
