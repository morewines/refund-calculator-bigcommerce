const request = require('request');

//lib
const assemble = require('./assemble');

const BC_CLIENT_ID = process.env.BC_CLIENT_ID,
      BC_TOKEN = process.env.BC_TOKEN,
      BC_PATH_V2 = process.env.BC_PATH_V2;
      BC_PATH_V3 = process.env.BC_PATH_V3;

const headers = {
  'X-Auth-Client': BC_CLIENT_ID,
  'X-Auth-Token': BC_TOKEN,
  'Accept': 'application/json'
}

/**
 * Helper for finding specific order from bc api
 * @param  {number}   orderID  [description]
 * @param  {Function} callback [description]
 * @return {object}            [description]
 */
function findOrder(orderID, callback) {
  const options = {
    url: `${BC_PATH_V2}/orders/${orderID}`,
    headers: headers
  }

  //send request to bc orders api
  request(options, (err, res, body) => {
    console.log(res.statusCode);
    if (res.statusCode !== 200) {
      callback(res.statusCode)
    }
    if (!err && res.statusCode == 200) {
      const orderData = JSON.parse(body);

      //populate order products
      populateOrder(orderData.products.url, (productsData) => {
        orderData.products = productsData;

        //populate order shipping address
        populateOrder(orderData.shipping_addresses.url, (shippingData) => {
          //order only ever have one shipping address, array[0]
          orderData.shipping_addresses = shippingData[0];

          //populate order coupon if coupon_discount present
          populateOrder(orderData.coupons.url, (couponData) => {
            if (couponData) {
              //order only ever have one coupon, array[0]
              orderData.coupons = couponData[0];
            }

            //assemble important data from order
            assemble.order(orderData, (assembledOrder) => {

              //get urls for each product
              populateSku(assembledOrder.products, (updatedProducts) => {
                console.log('updated products', updatedProducts);
                assembledOrder.products = updatedProducts;

                //send back to route
                callback(assembledOrder);
              })
            })
          })
        })
      })
    }
  })
}

function populateOrder(populateUrl, callback) {
  const options = {
    url: populateUrl,
    headers: headers
  }

  //send products to bc orders api
  request(options, (err, res, body) => {
    if (!err && res.statusCode == 200) {
      const populatedData = JSON.parse(body);
      callback(populatedData);
    }
    else {
      callback();
    }
  })
}

function populateSku(productArr, callback) {
  //use recursion to turn sending looped requests to bc api synchronous
  skuGrabber(0, productArr, (updatedProductsArr) => {
    callback(updatedProductsArr)
  })
}

function skuGrabber(i, productArr, callback) {
  if (i < productArr.length) {
    let sku = productArr[i].sku;
    let skuUrl = `${BC_PATH_V3}/catalog/products?sku=${sku}`;

    //urls for products are stored in a different bc api call
    populateOrder(skuUrl, (skuData) => {
      //extract sku url
      productArr[i].url = skuData.data[0].custom_url.url;

      //recursively call again
      skuGrabber(i+1, productArr, callback);
    })
  }
  else {
    callback(productArr);
  }
}

module.exports = {
  findOrder
}
