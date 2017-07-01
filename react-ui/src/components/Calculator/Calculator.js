import React, { Component } from 'react';
import request from 'request';

//CSS
import './Calculator.css';

//Modules
import Search from '../Search/Search';

class Calculator extends Component {
  constructor() {
    super();
    this.state = {
      searchValue: '',
      fetching: null,
      orderData: null
    }
    this.handleSearchChange = this.handleSearchChange.bind(this);
    this.handleSearchSubmit = this.handleSearchSubmit.bind(this);
  }

  getOrder(searchValue) {
    request.get(`/api/orders/${searchValue}`)
      .end( (err, res) => {
        if (err || !res.ok) {
          console.log(res.body);
        }
        else {
          console.log(res.body);
        }
      })
  }

  handleSearchChange(evt) {
    this.setState({
      searchValue: evt.target.value
    })
  }

  handleSearchSubmit(evt) {
    evt.preventDefault();
    this.getOrder(this.state.searchValue);
  }

  render() {

    const { searchValue } = this.state;

    return (
      <div className="container clearfix">
        <div className="search-wrap">
          <Search
            searchValue={searchValue}
            handleSearchChange={this.handleSearchChange}
            handleSearchSubmit={this.handleSearchSubmit}
          />
        </div>

        <div className="row">
          <div className="column">
            <div className="calc-column-wrap">

            </div>
          </div>
          <div className="column">
            <div className="calc-column-wrap">

            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Calculator;
