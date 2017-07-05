import React from 'react';

//CSS
import './OrderEdit.css';

//Modules
import RefundRow from './RefundRow/RefundRow';

//lib
import { format, total, subtotal, coupontotal } from '../../lib/currency';

const OrderEdit = ({refundOrderData, handleEditClick}) => {

  const {
    coupons,
    subtotal_ex_tax,
    coupon_discount,
    coupon_rate,
    shipping_cost_inc_tax,
    total_tax,
    shipping_addresses: {
      shipping_method,
      state,
      zip
    },
    refunded_amount,
    items_total,
    items_shipped,
    products
  } = refundOrderData;

  const handleUpdateMathData = (updatedProduct, i) => {
    //make copy to fix some weird orderData & refundOrderData bug
    let updatedRefundData = JSON.parse(JSON.stringify(refundOrderData));
    updatedRefundData.products[i] = updatedProduct;
    handleEditClick(updatedRefundData);
  }

  const productRow = products.map( (product, i) => {
    return (
      <RefundRow key={i+1} product={product}
        handleUpdateMathData={handleUpdateMathData}
        index={i}
       />
    )
  })
  let subTotal = subtotal(products);

  //if coupon exists, calculate it dynamically, else display existing bc api data
  let couponTotal = +coupon_discount ? coupontotal(subTotal, coupon_rate) : format(coupon_discount);

  //if sales tax exists, calculate it dynamically, else display existing bc api data
  //can reuse coupontotal helper, just passing in 8% for tax
  let salesTax = +total_tax ? coupontotal((subTotal - couponTotal), 8) : format(total_tax);
  let grandTotal = format(+subTotal - +couponTotal + +salesTax + +shipping_cost_inc_tax);

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th className="edit-table-adjust">Adjust Item</th>
            <th className="order-table-center edit-table-header">Qty</th>
            <th className="order-table-center edit-table-header table-currency">Price</th>
            <th className="order-table-center edit-table-total table-currency">Total</th>
          </tr>
        </thead>
        <tbody>
          {productRow}
          <tr>
            <td colSpan="3" className="order-edit-info">
              <div>Subtotal</div>
              <div>Coupon Code {coupons ? `(${coupons})`: ''}</div>
              <div>Shipping</div>
              <div>Sales Tax</div>
              <div>Refunded Amount</div>
              <div className="order-total"><b>GRAND TOTAL</b></div>
            </td>
            <td className="order-table-center">
              <div className="clearfix">
                <span className="float-left order-dollar order-price">$</span>
                <span className="float-right">
                  {subTotal}
                </span>
              </div>
              <div className="clearfix">
                <span className="float-left order-dollar order-price">$</span>
                <span className="float-right">
                  {couponTotal}
                </span>
              </div>
              <div className="clearfix">
                <span className="float-left order-dollar order-price">$</span>
                <span className="float-right">
                  {format(shipping_cost_inc_tax)}
                </span>
              </div>
              <div className="clearfix">
                <span className="float-left order-dollar order-price">$</span>
                <span className="float-right">
                  {salesTax}
                </span>
              </div>
              <div className="clearfix">
                <div className="float-left order-dollar order-price">$</div>
                <span className="float-right">
                  {format(refunded_amount)}
                </span>
              </div>
              <div className="clearfix order-total">
                <div className="float-left order-dollar order-price"><b>$</b></div>
                <span className="float-right">
                  <b>{grandTotal}</b>
                </span>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export default OrderEdit;
