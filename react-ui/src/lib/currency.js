function format(str) {
  return parseFloat(str).toFixed(2);
}

function total(numArr, coupon) {
  let sum = 0;
  for (let i = 0; i < numArr.length; i++) {
    sum += +numArr[i];
  }
  return sum - +coupon;
}

function subtotal(allProducts) {
  let sum = 0;
  for (let i = 0; i < allProducts.length; i++) {
    let productAmount = allProducts[i].quantity * +allProducts[i].price_ex_tax;
    sum += productAmount;
  }
  sum = format(sum);
  return sum;
}

function coupontotal(subTotal, couponRate) {
  let discountAmount = subTotal * (+couponRate / 100);
  return format(discountAmount);
}

export {
  format,
  total,
  subtotal,
  coupontotal
};
