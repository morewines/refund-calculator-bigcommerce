import React from 'react';

//CSS
import './RefundRow.css';

//Modules
import MathButton from '../MathButton/MathButton'

//lib
import { format } from '../../../lib/currency';

const RefundRow = ({product, editSubtract, handleEditClick}) => {
  const { name, quantity, price_ex_tax, url, sku, weight } = product;

  return (
    <tr>
      <td>
        <MathButton buttonText="+" />
        <MathButton
          editSubtract={editSubtract}
          handleEditClick={handleEditClick}
          buttonText="-" />
      </td>
      <td className="order-table-center">{quantity}</td>
      <td className="order-table-center">
        <span className="float-left order-dollar">$</span>
        <span className="float-right">{format(price_ex_tax)}</span>
      </td>
      <td className="order-table-center">
        <span className="float-left order-dollar">$</span>
        <span className="float-right">{format(quantity * price_ex_tax)}</span>
      </td>
    </tr>
  )
}

export default RefundRow;
