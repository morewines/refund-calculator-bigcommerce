import React, { Component } from 'react';
import './App.css';

//Modules
import Button from './components/Button/Button';
import Nav from './components/Nav/Nav';
import AccessForm from './components/AccessForm/AccessForm';
import Footer from './components/Footer/Footer';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isAllowed: false,
      message: null
    };
  }

  render() {
    const { isAllowed } = this.state;

    return (
      <div className="wrapper">
        <header>
          <Nav />
        </header>
        <main className="main-wrapper">
          {isAllowed ? 'test' : <AccessForm />}
        </main>
        <Footer />
      </div>
    )
  }
}

export default App;
