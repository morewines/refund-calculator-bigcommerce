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
import UpdateShipping from '../UpdateShipping/UpdateShipping';
import FaPlus from 'react-icons/lib/fa/plus';
import FaRefresh from 'react-icons/lib/fa/refresh';
import FaEdit from 'react-icons/lib/fa/edit'

//lib
import { format, total,
  subtotal, coupontotal } from '../../lib/currency';

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
      substituteItemQty: '1',
      updateShippingCost: '',
      //orderTable
      originalGrandTotal: '',
      //editTable
      editSubTotal: '',
      editCouponTotal: '',
      editSalesTax: '',
      editGrandTotal: '',
      //refundAmount
      refundAmount: ''
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
    this.handleShippingCostUpdate = this.handleShippingCostUpdate.bind(this);
    this.handleShippingSubmit = this.handleShippingSubmit.bind(this);
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
          }, () => {
            if (this.state.orderData !== 404) {
              this.calculateOriginalTotal();
              this.calculateEditTotals();
            }
          })
        }
      })
  }

  handleSearchChange(evt) {
    evt.preventDefault();
    this.setState({
      searchValue: evt.target.value
    })
  }

  handleSearchSubmit(evt) {
    evt.preventDefault();
    if (this.state.searchValue.length > 0) {
      this.setState({
        fetching: true
      }, () => {
        this.getOrder(this.state.searchValue);
      })
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
    }, () => {
      this.calculateEditTotals();
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
    }, () => {
      this.calculateEditTotals();
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
    }, () => {
      this.calculateEditTotals();
    })
  }

  handleShippingCostUpdate(evt) {
    evt.preventDefault();

    const name = evt.target.name;
    let value = evt.target.value;

    if (+value >= 0 || value === '') {
      this.setState({
        [name]: value
      })
    }
  }

  handleShippingSubmit(evt) {
    evt.preventDefault();

    const {
      refundOrderData, updateShippingCost
    } = this.state;

    let newRefundOrderData = refundOrderData;

    newRefundOrderData.shipping_cost_inc_tax = updateShippingCost;

    this.setState({
      refundOrderData: JSON.parse(JSON.stringify(newRefundOrderData)),
      updateShippingCost: '',
      showShippingModal: false
    }, () => {
      this.calculateEditTotals();
    })
  }

  calculateOriginalTotal() {
    const {
      subtotal_ex_tax,
      shipping_cost_inc_tax,
      total_tax,
      coupon_discount
    } = this.state.orderData;

    let grandTotal = total([subtotal_ex_tax, shipping_cost_inc_tax, total_tax], coupon_discount);

    this.setState({
      originalGrandTotal: grandTotal
    })
  }

  calculateEditTotals() {
    const {
      coupon_discount,
      coupon_rate,
      shipping_cost_inc_tax,
      total_tax,
      products
    } = this.state.refundOrderData;

    let editSubTotal = subtotal(products);
    //if coupon exists, calculate it dynamically, else display existing bc api data
    let editCouponTotal = +coupon_discount ? coupontotal(editSubTotal, coupon_rate) : format(coupon_discount);
    //if sales tax exists, calculate it dynamically, else display existing bc api data
    //can reuse coupontotal helper, just passing in 8% for tax
    let editSalesTax = +total_tax ? coupontotal((editSubTotal - editCouponTotal), 8) : format(total_tax);
    let editGrandTotal = format(+editSubTotal - +editCouponTotal + +editSalesTax + +shipping_cost_inc_tax);

    this.setState({
      editSubTotal,
      editCouponTotal,
      editSalesTax,
      editGrandTotal
    }, () => {
      this.calculateRefund();
    })
  }

  calculateRefund() {
    const {
      originalGrandTotal,
      editGrandTotal
    } = this.state;

    let refundAmount = format(+originalGrandTotal - +editGrandTotal);
    this.setState({
      refundAmount
    })
  }

  render() {
    const { searchValue, fetching,
      searchPlaceholder, orderData,
      mostRecentSearch, refundOrderData,
      originalGrandTotal, editSubTotal,
      editCouponTotal, editSalesTax,
      editGrandTotal } = this.state;

    const substituteModalStyle = {
      overlay: {
        backgroundColor: 'rgba(96, 108, 118, .5)',
        top: '52px'
      },
      content: {
        height: '37.2rem',
        margin: 'auto',
        width: '90rem',
        maxWidth: '80%',
        overflow: 'hidden'
      }
    }

    const shippingModalStyle = {
      overlay: {
        backgroundColor: 'rgba(96, 108, 118, .5)',
        top: '52px'
      },
      content: {
        height: '26.2rem',
        margin: 'auto',
        width: '90rem',
        maxWidth: '80%',
        overflow: 'hidden'
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
              <UpdateShipping
                updateShippingCost={this.state.updateShippingCost}
                handleShippingCostUpdate={this.handleShippingCostUpdate}
                handleShippingSubmit={this.handleShippingSubmit}
              />
            </ReactModal>
            <div>
              <h5 className="refund-amount-heading">
                Customer is due a refund of
                $ <span className="refund-price">{this.state.refundAmount}</span>
                .
              </h5>
            </div>
            <hr className="divider" />
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
                  <OrderTable orderData={orderData}
                    originalGrandTotal={originalGrandTotal}
                    componentWillReceiveProps={this.componentWillReceiveProps}
                  />
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
                    editSubTotal={editSubTotal}
                    editCouponTotal={editCouponTotal}
                    editSalesTax={editSalesTax}
                    editGrandTotal={editGrandTotal}
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
