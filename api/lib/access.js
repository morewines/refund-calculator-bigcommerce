const accessKey = process.env.ACCESS_KEY;

/**
 * checks if client has access to use API
 * @param  {number} accessValue from client
 * @return {object}             status 200 / 403
 */
function check(accessValue, callback) {
  console.warn('accessValue', accessValue)
  
  if (accessKey !== accessValue) {
    callback(403);
  } else {
    callback(200);
  }
}

module.exports = {
  check
};
