const express = require('express'),
  router = express.Router();

// lib
const access = require('../lib/access'),
  bigCommerce = require('../lib/bigCommerce');

/**
 * Gets a specific order at /api/orders/:orderID
 * @param  {number} '/:orderID' BC order number
 * @return {object} specific order data w/ products ordered
 */
router.get('/:orderID', (req, res, next) => {
  const orderID = req.params.orderID,
    accessValue = req.query.accessValue;

  // check if client has correct access code
  access.check(accessValue, status => {
    if (status !== 200) {
      res.json(403);
    } else {
      // retrieve order from bc api
      bigCommerce.findOrder(orderID, assembledOrder => {
        res.json({ assembledOrder });
      });
    }
  });
});

module.exports = router;
