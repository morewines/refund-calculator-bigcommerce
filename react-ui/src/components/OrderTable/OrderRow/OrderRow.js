import React from 'react';

// CSS
import './OrderRow.css';

// lib
import { format } from '../../../lib/currency';

const OrderRow = ({ product }) => {
  const { name, quantity, price_ex_tax, url, sku, weight } = product;

  return (
    <tr>
      <td>
        <div className="truncate">
          <div className="truncated">
            <a href={`https://morewines.com${url}`} target="_blank">
              {name}
            </a>
          </div>
          <div className="spacer" />
          <span>&nbsp;</span>
        </div>
      </td>
      <td className="order-table-center">{sku}</td>
      <td className="order-table-center">{format(weight)}lbs</td>
      <td className="order-table-center">{quantity}</td>
      <td className="order-table-center order-price">
        <span className="float-left order-dollar">$</span>
        <span className="float-right">{format(price_ex_tax)}</span>
      </td>
      <td className="order-table-center">
        <span className="float-left order-dollar">$</span>
        <span className="float-right">{format(quantity * price_ex_tax)}</span>
      </td>
    </tr>
  );
};

export default OrderRow;
