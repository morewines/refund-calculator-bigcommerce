import React, { Component } from 'react';
import './App.css';

//Modules
import Button from './components/Button/Button';
import Nav from './components/Nav/Nav';
import AccessForm from './components/AccessForm/AccessForm';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isAllowed: false,
      message: null
    };
  }

  render() {
    return (
      <div className="wrapper">
        <Nav />
        <AccessForm />
      </div>
    )
  }
}

export default App;
