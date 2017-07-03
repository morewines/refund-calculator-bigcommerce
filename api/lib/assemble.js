function order(orderData, callback) {
  //destructure orderData
  const {
    coupon_discount,
    coupons,
    status,
    items_shipped,
    items_total,
    shipping_addresses: { state, zip, shipping_method },
    subtotal_ex_tax,
    total_tax,
    total_inc_tax,
    products,
    shipping_cost_inc_tax
  } = orderData;

  //assemble important info
  const assembledOrder = {
    coupon_discount,
    status,
    items_shipped,
    items_total,
    shipping_addresses: {
      state,
      zip,
      shipping_method,
    },
    subtotal_ex_tax,
    total_tax,
    total_inc_tax,
    shipping_cost_inc_tax
  };

  //add coupon code if exist
  if (coupons.code) {
    assembledOrder.coupons = coupons.code;
  }

  //assemble products array info
  assembleProducts(products, (assembledProducts) => {
    //replace assembled products array to rest of order
    assembledOrder.products = assembledProducts;
    //send order info back
    callback(assembledOrder);
  })
}

function assembleProducts(products, callback) {
  let assembledProducts = [];
  for (let i = 0; i < products.length; i++) {

    const {
      price_ex_tax,
      total_ex_tax,
      weight,
      sku,
      quantity,
      quantity_refunded,
      quantity_shipped,
      name
    } = products[i];

    const tempObj = {
      price_ex_tax,
      total_ex_tax,
      weight,
      sku,
      quantity,
      quantity_refunded,
      quantity_shipped,
      name
    };

    assembledProducts.push(tempObj);
  }
  callback(assembledProducts);
}

module.exports = {
  order
}
