import React from 'react';

//CSS
import './RefundRow.css';

//Modules
import MathButton from '../MathButton/MathButton'

//lib
import { format } from '../../../lib/currency';

const RefundRow = ({product, handleUpdateMathData, index}) => {
  const { name, quantity, price_ex_tax, url, sku, weight } = product;

  const handleSubtract = () => {
    //make copy to fix some weird orderData & refundOrderData bug
    let updatedProduct = JSON.parse(JSON.stringify(product));
    if (updatedProduct.quantity > 0) {
      updatedProduct.quantity--;
    }
    handleUpdateMathData(updatedProduct, index);
  }

  const handleAdd = () => {
    //make copy to fix some weird orderData & refundOrderData bug
    let updatedProduct = JSON.parse(JSON.stringify(product));
    updatedProduct.quantity++;
    handleUpdateMathData(updatedProduct, index);
  }

  return (
    <tr>
      <td>
        <MathButton
          handleMath={handleAdd}
          buttonText="+" />
        <MathButton
          handleMath={handleSubtract}
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
