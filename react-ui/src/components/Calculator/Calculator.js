import React, { Component } from 'react';
import SuperAgent from 'superagent';
import ReactModal from 'react-modal';

//CSS
import './Calculator.css';

//Modules
import Search from '../Search/Search';
import Button from '../Button/Button';
import OrderTable from '../OrderTable/OrderTable';
import OrderEdit from '../OrderEdit/OrderEdit';
import AddSubstitute from '../AddSubstitute/AddSubstitute';
import FaPlus from 'react-icons/lib/fa/plus';
import FaRefresh from 'react-icons/lib/fa/refresh';
import FaEdit from 'react-icons/lib/fa/edit'

class Calculator extends Component {
  constructor() {
    super();
    this.state = {
      searchValue: '',
      mostRecentSearch: '',
      searchPlaceholder: 'Order #',
      fetching: false,
      orderData: null,
      refundOrderData: null,
      copyOriginalData: null,
      showModal: false,
      showShippingModal: false,
      substituteItemWeight: '3.5',
      substituteItemName: '',
      substituteItemPrice: '',
      substituteItemQty: '1'
    }
    this.handleSearchChange = this.handleSearchChange.bind(this);
    this.handleSearchSubmit = this.handleSearchSubmit.bind(this);
    this.handleEditClick = this.handleEditClick.bind(this);
    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
    this.handleCloseShippingModal = this.handleCloseShippingModal.bind(this);
    this.handleOpenShippingModal = this.handleOpenShippingModal.bind(this);
    this.handleSubstituteWeightChange = this.handleSubstituteWeightChange.bind(this);
    this.handleSubstituteInputChange = this.handleSubstituteInputChange.bind(this);
    this.handleSubstituteSubmit = this.handleSubstituteSubmit.bind(this);
    this.handleReset = this.handleReset.bind(this);
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
            mostRecentSearch: this.state.searchValue,
            searchValue: '',
            searchPlaceholder: 'Order #',
            orderData: res.body.assembledOrder,
            refundOrderData: JSON.parse(JSON.stringify(res.body.assembledOrder)),
            copyOriginalData: JSON.parse(JSON.stringify(res.body.assembledOrder)),
            fetching: false
          })
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
    if (this.state.searchValue.length > 0) {
      this.setState({
        fetching: true
      })
      this.getOrder(this.state.searchValue);
    }
    else {
      this.setState({
        searchPlaceholder: 'Order # required'
      })
    }
  }

  handleEditClick(updatedRefundData) {
    this.setState({
      refundOrderData: updatedRefundData
    })
  }

  handleSubstituteWeightChange(evt) {
    this.setState({
      substituteValue: evt.target.value
    })
  }

  handleSubstituteInputChange(evt) {
    const name = evt.target.name;
    let value = evt.target.value;
    if (name === 'substituteItemQty') {
      // if number of value is positive or is blank AND doesn't include .
      if ( (+value > 0 || value === '') && !value.includes('.') ) {
        this.setState({
          [name]: value
        })
      }
    }
    else if (name === 'substituteItemPrice') {
      //value has to be positive or blank
      if (+value > 0 || value === '') {
        this.setState({
          [name]: value
        })
      }
    }
    else {
      this.setState({
        [name]: evt.target.value
      })
    }
  }

  handleSubstituteSubmit(evt) {
    evt.preventDefault();

    const {
      substituteItemWeight,
      substituteItemName,
      substituteItemPrice,
      substituteItemQty,
      refundOrderData,
      orderData
    } = this.state;

    let newSubstituteItem = {
      weight: substituteItemWeight,
      name: substituteItemName,
      price_ex_tax: substituteItemPrice,
      quantity: +substituteItemQty
    }

    let originalOrderSubstituteItem = {
      weight: substituteItemWeight,
      name: substituteItemName,
      price_ex_tax: substituteItemPrice,
      quantity: 0,
      sku: 'n/a',
      url: '/'
    }

    this.handleCloseModal();

    let newRefundOrderData = refundOrderData;
    newRefundOrderData.products.push(newSubstituteItem);

    let newOrderData = orderData;
    newOrderData.products.push(originalOrderSubstituteItem);

    this.setState({
      refundOrderData: newRefundOrderData,
      orderData: newOrderData,
      substituteItemWeight: '3.5',
      substituteItemName: '',
      substituteItemPrice: '',
      substituteItemQty: '1'
    })
  }

  handleCloseModal() {
    this.setState({
      showModal: false
    })
  }

  handleOpenModal() {
    this.setState({
      showModal: true
    })
  }

  handleCloseShippingModal() {
    this.setState({
      showShippingModal: false
    })
  }

  handleOpenShippingModal() {
    this.setState({
      showShippingModal: true
    })
  }

  handleReset(evt) {
    evt.preventDefault();

    this.setState({
      refundOrderData: JSON.parse(JSON.stringify(this.state.copyOriginalData)),
      orderData: JSON.parse(JSON.stringify(this.state.copyOriginalData))
    })
    console.log(this.state);
  }

  render() {
    const { searchValue, fetching,
      searchPlaceholder, orderData,
      mostRecentSearch, refundOrderData } = this.state;

    const substituteModalStyle = {
      overlay: {
        backgroundColor: 'rgba(96, 108, 118, .5)',
        top: '52px'
      },
      content: {
        height: '37.2rem',
        margin: 'auto',
        width: '90rem',
        maxWidth: '80%'
      }
    }

    const shippingModalStyle = {
      overlay: {
        backgroundColor: 'rgba(96, 108, 118, .5)',
        top: '52px'
      },
      content: {
        height: '17.2rem',
        margin: 'auto',
        width: '90rem',
        maxWidth: '80%'
      }
    }

    return (
      <div className="container clearfix">
        <div className="search-wrap">
          <div className="search-not-found">
            {orderData === 404 ? <p><sup>*</sup>Order not found</p> : ''}
          </div>
          <Search
            searchValue={searchValue}
            handleSearchChange={this.handleSearchChange}
            handleSearchSubmit={this.handleSearchSubmit}
            fetching={fetching}
            searchPlaceholder={searchPlaceholder}

          />
        </div>
        { (refundOrderData == null || refundOrderData === 404) || fetching ? (
          ''
          ) : (
          <div className="center-text calc-button-wrap">
            <hr className="divider" />
            <Button
              extraClass="calc-button-top"
              buttonText="Reset Order"
              icon={
                <FaRefresh size={18} className="fa-spin" style={{
                  marginBottom: '3px',
                  marginRight: '1em'
              }}/>}
              handleClick={this.handleReset}
            />
            <Button
              extraClass="calc-button-top"
              buttonText="Add Substitute"
              icon={
                <FaPlus size={18} className="fa-spin" style={{
                  marginBottom: '3px',
                  marginRight: '1em'
                }}/>}
              handleClick={this.handleOpenModal}
            />
            <ReactModal
              isOpen={this.state.showModal}
              onRequestClose={this.handleCloseModal}
              style={substituteModalStyle}
              contentLabel="Add Substitute Item"
            >
            <AddSubstitute
              substituteItemWeight={this.state.substituteItemWeight}
              handleSubstituteWeightChange={this.handleSubstituteWeightChange}
              substituteItemName={this.state.substituteItemName}
              substituteItemQty={this.state.substituteItemQty}
              substituteItemPrice={this.state.substituteItemPrice}
              handleSubstituteInputChange={this.handleSubstituteInputChange}
              handleSubstituteSubmit={this.handleSubstituteSubmit}
            />
            </ReactModal>
            <Button
              extraClass=""
              buttonText="Update Shipping"
              icon={
                <FaEdit size={18} className="fa-spin" style={{
                  marginBottom: '3px',
                  marginRight: '1em'
              }}/>}
              handleClick={this.handleOpenShippingModal}
            />
            <ReactModal
              isOpen={this.state.showShippingModal}
              onRequestClose={this.handleCloseShippingModal}
              style={shippingModalStyle}
              contentLabel="Update Shipping"
            >
              Feature in progress
            </ReactModal>
          </div>
        )}

        <div className="row">
          <div className="column">
            <div className="calc-column-wrap">
              { (orderData == null || orderData === 404) || fetching ? (
                ''
                ) : (
                <div>
                  <h5>Order # {mostRecentSearch} ({orderData.status})</h5>
                  <OrderTable orderData={orderData} />
                </div>
                )
              }
            </div>
          </div>
          <div className="column">
            <div className="calc-column-wrap">
              { (refundOrderData == null || refundOrderData === 404) || fetching ? (
                ''
                ) : (
                <div>
                  <h5>Edit Order &#8212; What is the customer keeping?</h5>
                  <OrderEdit
                    refundOrderData={refundOrderData}
                    handleEditClick={this.handleEditClick}
                  />
                </div>
                )
              }
            </div>
          </div>

        </div>
      </div>
    )
  }
}

export default Calculator;
