import React from 'react';

//CSS
import './OrderTable.css';

//Modules
import OrderRow from './OrderRow/OrderRow';

//lib
import { format, total } from '../../lib/currency';

const OrderTable = ({orderData}) => {

  const {
    coupons,
    subtotal_ex_tax,
    coupon_discount,
    shipping_cost_inc_tax,
    total_tax,
    shipping_addresses: {
      shipping_method,
      state,
      zip
    },
    refunded_amount,
    items_total,
    items_shipped
  } = orderData;

  const productRow = orderData.products.map( (product, i) => {
    return (
      <OrderRow key={i} product={product} />
    )
  })

  let grandTotal = total([subtotal_ex_tax, shipping_cost_inc_tax, total_tax], coupon_discount)

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th className="order-table-item">Item</th>
            <th className="order-table-center">Sku</th>
            <th className="order-table-center">Weight</th>
            <th className="order-table-center">Qty</th>
            <th className="order-table-center table-currency">Price</th>
            <th className="order-table-center table-currency">Total</th>
          </tr>
        </thead>
        <tbody>
          {productRow}
          <tr>
            <td colSpan="2">
              <div className="order-table-general-info">
                To: {zip}, {state} via {shipping_method}
              </div>
              <div className="order-table-general-info">
                Shipped: {`${items_shipped}/${items_total}`}
              </div>
            </td>
            <td colSpan="3" className="">
              <div>Subtotal</div>
              <div>Coupon Code {coupons ? `(${coupons})`: ''}</div>
              <div>Shipping</div>
              <div>Sales Tax</div>
              <div>Refunded Amount</div>
              <div className="order-total"><b>GRAND TOTAL</b></div>
            </td>
            <td className="order-table-center">
              <div className="clearfix">
                <span className="float-left order-dollar">$</span>
                <span className="float-right">
                  {format(subtotal_ex_tax)}
                </span>
              </div>
              <div className="clearfix">
                <span className="float-left order-dollar">$</span>
                <span className="float-right">
                  {format(coupon_discount)}
                </span>
              </div>
              <div className="clearfix">
                <span className="float-left order-dollar">$</span>
                <span className="float-right">
                  {format(shipping_cost_inc_tax)}
                </span>
              </div>
              <div className="clearfix">
                <span className="float-left order-dollar">$</span>
                <span className="float-right">
                  {format(total_tax)}
                </span>
              </div>
              <div className="clearfix">
                <div className="float-left order-dollar">$</div>
                <span className="float-right">
                  {format(refunded_amount)}
                </span>
              </div>
              <div className="clearfix order-total">
                <div className="float-left order-dollar"><b>$</b></div>
                <span className="float-right">
                  <b>{format(grandTotal)}</b>
                </span>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export default OrderTable;
