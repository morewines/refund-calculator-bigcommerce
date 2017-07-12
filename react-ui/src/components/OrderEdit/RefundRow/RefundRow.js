import React from 'react';

//CSS
import './RefundRow.css';

//Modules
import MathButton from '../MathButton/MathButton';
import FaPlus from 'react-icons/lib/fa/plus';
import FaMinus from 'react-icons/lib/fa/minus';

//lib
import { format } from '../../../lib/currency';

const RefundRow = ({product, handleUpdateMathData, index}) => {
  const { quantity, price_ex_tax } = product;

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
          buttonText={<FaPlus />} />
        <MathButton
          handleMath={handleSubtract}
          buttonText={<FaMinus />} />
      </td>
      <td className="order-table-center">{quantity}</td>
      <td className="order-table-center order-price">
        <span className="float-left order-dollar">$</span>
        <span className="float-right">{format(price_ex_tax)}</span>
      </td>
      <td className="order-table-center">
        <span className="float-left order-dollar order-price">$</span>
        <span className="float-right">{format(quantity * price_ex_tax)}</span>
      </td>
    </tr>
  )
}

export default RefundRow;
