require('dotenv').config();

module.exports = {
  appId: process.env.ZALOPAY_APP_ID,
  key1: process.env.ZALOPAY_KEY1,
  key2: process.env.ZALOPAY_KEY2,
  endpoint: process.env.ZALOPAY_ENDPOINT,
  queryEndpoint: process.env.ZALOPAY_QUERY_ENDPOINT,
  callbackUrl: process.env.CALLBACK_URL,
};