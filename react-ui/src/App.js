import React, { Component } from 'react';

//CSS
import './App.css';

//Modules
import Button from './components/Button/Button';
import Nav from './components/Nav/Nav';
import AccessForm from './components/AccessForm/AccessForm';
import Footer from './components/Footer/Footer';
import Calculator from './components/Calculator/Calculator';
import FaRefresh from 'react-icons/lib/fa/refresh';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      accessValue: '',
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
    console.log(this.state.accessValue)
    this.setState({
      isAllowedAccess: true
    })
  }

  render() {
    const { isAllowedAccess, accessValue } = this.state;

    return (
      <div className="wrapper">

        <header>
          <Nav />
        </header>

        <main className="main-wrapper">
          {
            isAllowedAccess ? <Calculator /> : (
              <AccessForm
                accessValue={accessValue}
                handleAccessSubmit={this.handleAccessSubmit}
                handleAccessChange={this.handleAccessChange}
              />
            )
          }
          <div className="container">
            <Button
              extraClass="float-right"
              buttonText="Start Over"
              icon={
                <FaRefresh size={18} style={{
                  marginBottom: '3px',
                  marginRight: '1em'
                }}/>
              }
            />
          </div>
        </main>




        <Footer />
      </div>
    )
  }
}

export default App;
