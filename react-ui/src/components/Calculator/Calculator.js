import React, { Component } from 'react';
import SuperAgent from 'superagent';

//CSS
import './Calculator.css';

//Modules
import Search from '../Search/Search';
import Button from '../Button/Button';
import FaRefresh from 'react-icons/lib/fa/refresh';

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
    SuperAgent
      .get(`/api/orders/${searchValue}`)
      .query({ accessValue: this.props.accessValue })
      .end( (err, res) => {
        if (err || !res.ok) {
          console.log(res.body);
        }
        else {
          this.setState({
            searchValue: '',
            orderData: res.body.assembledOrder
          })
          console.log(this.state);
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
              <Button
                extraClass=""
                buttonText="Start Over"
                icon={
                  <FaRefresh size={18} style={{
                    marginBottom: '3px',
                    marginRight: '1em'
                  }}/>
                }
              />
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
