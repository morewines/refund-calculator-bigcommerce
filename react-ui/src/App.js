import React, { Component } from 'react';

//CSS
import './App.css';

//Modules
import Nav from './components/Nav/Nav';
import AccessForm from './components/AccessForm/AccessForm';
import Footer from './components/Footer/Footer';
import Calculator from './components/Calculator/Calculator';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      accessValue: '',
      accessPlaceholder: 'Access #',
      isAllowedAccess: false,
      message: null
    };
    this.handleAccessChange = this.handleAccessChange.bind(this);
    this.handleAccessSubmit = this.handleAccessSubmit.bind(this);
  }

  handleAccessChange(evt) {
    this.setState({
      accessValue: evt.target.value
    })

  }

  handleAccessSubmit(evt) {
    evt.preventDefault();
    const accessKey = process.env.REACT_APP_ACCESS_KEY;

    if (this.state.accessValue !== accessKey) {
      this.setState({
        accessValue: '',
        accessPlaceholder: 'Please enter a valid access #'
      })
    }
    else {
      this.setState({
        isAllowedAccess: true
      })
    }
  }

  render() {
    const { isAllowedAccess, accessValue, accessPlaceholder } = this.state;

    return (
      <div className="wrapper">

        <header>
          <Nav />
        </header>

        <main className="main-wrapper">
          {isAllowedAccess ? (
            <Calculator accessValue={accessValue} />
            ) : (
            <AccessForm
              accessValue={accessValue}
              accessPlaceholder={accessPlaceholder}
              handleAccessSubmit={this.handleAccessSubmit}
              handleAccessChange={this.handleAccessChange}
            />
          )}
        </main>

        <Footer />
      </div>
    )
  }
}

export default App;
