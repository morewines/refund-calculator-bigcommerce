import React from 'react';

//CSS
import './OrderEdit.css';

//Modules
import RefundRow from './RefundRow/RefundRow';

//lib
import { format } from '../../lib/currency';

const OrderEdit = ({
    refundOrderData, handleEditClick,
    editSubTotal, editCouponTotal,
    editSalesTax, editGrandTotal
  }) => {

  const {
    coupons,
    shipping_cost_inc_tax,
    refunded_amount,
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
                  {editSubTotal}
                </span>
              </div>
              <div className="clearfix">
                <span className="float-left order-dollar order-price">$</span>
                <span className="float-right">
                  {editCouponTotal}
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
                  {editSalesTax}
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
                  <b>{editGrandTotal}</b>
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
