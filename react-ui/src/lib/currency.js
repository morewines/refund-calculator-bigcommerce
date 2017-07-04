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

export {
  format,
  total
};
