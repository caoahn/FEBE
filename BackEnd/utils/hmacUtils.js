const crypto = require('crypto');

const hmacSHA256 = (data, key) => {
  return crypto.createHmac('sha256', key).update(data).digest('hex');
};

module.exports = { hmacSHA256 };