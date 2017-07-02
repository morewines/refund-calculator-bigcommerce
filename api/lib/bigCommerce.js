const request = require('request');

//lib
const assemble = require('../lib/assemble');

const BC_CLIENT_ID = process.env.BC_CLIENT_ID,
      BC_TOKEN = process.env.BC_TOKEN,
      BC_PATH_V2 = process.env.BC_PATH_V2;

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
    if (!err && res.statusCode == 200) {
      const orderData = JSON.parse(body);
      console.log(orderData);

      //populate order products
      populateOrder(orderData.products.url, (productsData) => {
        orderData.products = productsData;
        console.log('entering products population')

        //populate order shipping address
        populateOrder(orderData.shipping_addresses.url, (shippingData) => {
          //order only ever have one shipping address, array[0]
          orderData.shipping_addresses = shippingData[0];
          console.log('entering products shipping address', shippingData[0])

          //populate order coupon if coupon_discount present
          // if (orderData.coupon_discount) {
            populateOrder(orderData.coupons.url, (couponData) => {
              if (couponData) {
                //order only ever have one coupon, array[0]
                orderData.coupons = couponData[0];
                console.log('entering products coupons')
              }

              //assemble important data from order
              assemble.order(orderData, (assembledOrder) => {
                console.log('entering order assembly')

                //send back to route
                callback(assembledOrder);
              })
            })
          // }
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
      callback(populatedData)
    }
    else {
      callback();
    }
  })
}

module.exports = {
  findOrder
}
