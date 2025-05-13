const crypto = require('crypto');
const querystring = require('querystring');
require('dotenv').config();
const qs = require('qs');
const dateFormat = require('dateformat');
const axios = require('axios');
const { hmacSHA256 } = require('../utils/hmacUtils');
const zaloPayConfig = require('../config/zaloConfig');


const sortObject = (obj) => {
  const sorted = {};
  const keys = Object.keys(obj).sort();
  keys.forEach((key) => {
    sorted[key] = obj[key];
  });
  return sorted;
};

exports.createPayment = (req, res) => {
  try {
    // Lấy IP của client
    const ipAddr =
      req.headers['x-forwarded-for'] ||
      req.connection.remoteAddress ||
      req.socket.remoteAddress ||
      req.connection.socket.remoteAddress ||
      '127.0.0.1';

    // Lấy thông tin từ config
    const tmnCode = process.env.VNP_TMNCODE;
    const secretKey = process.env.VNP_HASHSECRET;
    const vnpUrl = process.env.VNP_URL;
    const returnUrl = process.env.VNP_RETURNURL;

    // Tạo ngày và mã đơn hàng
    const date = new Date();
    const createDate = dateFormat(date, 'yyyymmddHHmmss');
    const orderId = `${createDate}-${Math.random().toString(36).substring(2, 9)}`;

    // Lấy dữ liệu từ body
    const { amount, bankCode, orderDescription, orderType, language } = req.body;

    // Validate input
    if (!amount || !orderDescription) {
      return res.status(400).json({ message: 'Thiếu amount hoặc orderDescription' });
    }

    // Thiết lập tham số
    let vnpParams = {
      vnp_Version: '2.1.0',
      vnp_Command: 'pay',
      vnp_TmnCode: tmnCode,
      vnp_Locale: language && language !== '' ? language : 'vn',
      vnp_CurrCode: 'VND',
      vnp_TxnRef: orderId,
      vnp_OrderInfo: orderDescription,
      vnp_OrderType: orderType || 'billpayment',
      vnp_Amount: parseInt(amount) * 100, // Số tiền * 100
      vnp_ReturnUrl: returnUrl,
      vnp_IpAddr: ipAddr,
      vnp_CreateDate: createDate,
    };

    if (bankCode && bankCode !== '') {
      vnpParams['vnp_BankCode'] = bankCode;
    }

    // Sắp xếp tham số
    vnpParams = sortObject(vnpParams);

    // Tạo chuỗi ký
    const signData = qs.stringify(vnpParams, { encode: false });
    const hmac = crypto.createHmac('sha512', secretKey);
    const signed = hmac.update(Buffer.from(signData, 'utf-8')).digest('hex');
    vnpParams['vnp_SecureHash'] = signed;

    // Tạo URL thanh toán
    const paymentUrl = vnpUrl + '?' + qs.stringify(vnpParams, { encode: true });

    console.log('vnpParams:', vnpParams);
    console.log('signData:', signData);
    console.log('Generated URL:', paymentUrl);

    // Trả về URL thay vì redirect
    res.json({ url: paymentUrl });
  } catch (error) {
    console.error('Error in createPayment:', error);
    res.status(500).json({ message: 'Lỗi server', error: error.message });
  }
};

exports.vnpayReturn = (req, res) => {
  try {
    let vnpParams = req.query;
    const secureHash = vnpParams['vnp_SecureHash'];

    delete vnpParams['vnp_SecureHash'];
    delete vnpParams['vnp_SecureHashType'];

    vnpParams = sortObject(vnpParams);

    const secretKey = config.get('vnp_HashSecret');
    const signData = qs.stringify(vnpParams, { encode: false });
    const hmac = crypto.createHmac('sha512', secretKey);
    const signed = hmac.update(Buffer.from(signData, 'utf-8')).digest('hex');

    if (secureHash === signed) {
      const responseCode = vnpParams['vnp_ResponseCode'];
      if (responseCode === '00') {
        res.json({ status: 'success', message: 'Thanh toán thành công', data: vnpParams });
      } else {
        res.json({ status: 'error', message: 'Thanh toán thất bại', data: vnpParams });
      }
    } else {
      res.json({ status: 'error', message: 'Chữ ký không hợp lệ' });
    }
  } catch (error) {
    console.error('Error in vnpayReturn:', error);
    res.status(500).json({ message: 'Lỗi server', error: error.message });
  }
};




class PaymentController {
  // Tạo đơn hàng
  static async createOrder(req, res) {
    console.log(zaloPayConfig);
    try {
      const { amount, orderId, description } = req.body;

      // Thông tin đơn hàng
      const order = {
        app_id: zaloPayConfig.appId,
        app_trans_id: `${new Date().toISOString().slice(0, 10).replace(/-/g, '')}_${orderId}`,
        app_user: 'user123',
        app_time: Date.now(),
        item: JSON.stringify([{ item_id: orderId, item_name: description }]),
        embed_data: JSON.stringify({}),
        amount: parseInt(amount),
        description: `Payment for order #${orderId}`,
        bank_code: '',
        callback_url: zaloPayConfig.callbackUrl,
      };

      // Tạo chuỗi dữ liệu để ký
      const dataSign = `${order.app_id}|${order.app_trans_id}|${order.app_user}|${order.amount}|${order.app_time}|${order.embed_data}|${order.item}`;
      order.mac = hmacSHA256(dataSign, zaloPayConfig.key1);

      // Gửi yêu cầu đến ZaloPay
      const response = await axios.post(zaloPayConfig.endpoint, order);
      return res.json(response.data);
    } catch (error) {
      console.error('Error creating order:', error.message);
      return res.status(500).json({ error: 'Failed to create order' });
    }
  }

  // Xử lý callback từ ZaloPay
  static async handleCallback(req, res) {
    try {
      const { data, mac } = req.body;

      // Xác thực callback
      const computedMac = hmacSHA256(data, zaloPayConfig.key2);
      if (computedMac !== mac) {
        return res.json({ return_code: -1, return_message: 'Invalid mac' });
      }

      // Xử lý trạng thái giao dịch
      const orderData = JSON.parse(data);
      console.log('Callback received:', orderData);

      // TODO: Cập nhật trạng thái đơn hàng trong database
      // Ví dụ: await updateOrderStatus(orderData.app_trans_id, 'success');

      return res.json({ return_code: 1, return_message: 'Success' });
    } catch (error) {
      console.error('Error handling callback:', error.message);
      return res.status(500).json({ error: 'Failed to process callback' });
    }
  }

  // Kiểm tra trạng thái đơn hàng
  static async checkOrderStatus(req, res) {
    try {
      const { app_trans_id } = req.body;

      const params = {
        app_id: zaloPayConfig.appId,
        app_trans_id,
      };

      // Tạo chuỗi dữ liệu để ký
      const dataSign = `${params.app_id}|${params.app_trans_id}|${zaloPayConfig.key1}`;
      params.mac = hmacSHA256(dataSign, zaloPayConfig.key1);

      // Gửi yêu cầu đến ZaloPay
      const response = await axios.post(zaloPayConfig.queryEndpoint, params);
      return res.json(response.data);
    } catch (error) {
      console.error('Error checking order status:', error.message);
      return res.status(500).json({ error: 'Failed to check order status' });
    }
  }
}

module.exports = PaymentController;








































// exports.createPayment = (req, res) => {
//   const { amount, orderInfo } = req.body;
//   const ipAddr = '127.0.0.1';

//   const date = new Date();
//   const createDate = `${date.getFullYear()}${('0' + (date.getMonth() + 1)).slice(-2)}${('0' + date.getDate()).slice(-2)}${('0' + date.getHours()).slice(-2)}${('0' + date.getMinutes()).slice(-2)}${('0' + date.getSeconds()).slice(-2)}`;
//   const orderId = `${createDate}-${Math.random().toString(36).substring(2, 9)}`;

//   let vnpParams = {
//     vnp_Command: 'pay',
//     vnp_TmnCode: process.env.VNP_TMNCODE,
//     vnp_Amount: amount * 100,
//     vnp_CurrCode: 'VND',
//     vnp_TxnRef: orderId,
//     vnp_OrderInfo: orderInfo || 'Thanh toan don hang',
//     vnp_OrderType: 'billpayment',
//     vnp_Locale: 'vn',
//     vnp_ReturnUrl: process.env.VNP_RETURNURL,
//     vnp_IpAddr: ipAddr,
//     vnp_CreateDate: dateFormat(new Date()),
//     vnp_ExpireDate: dateFormat(new Date(Date.now() +  150 * 60 * 1000)), // 15 phút
//   };

//   vnpParams = sortObject(vnpParams);

//   // Tạo chuỗi ký không mã hóa ký tự đặc biệt
//   const signData = Object.keys(vnpParams)
//     .map((key) => `${key}=${vnpParams[key]}`)
//     .join('&');
//   const hmac = crypto.createHmac('sha512', process.env.VNP_HASHSECRET);
//   const secureHash = hmac.update(Buffer.from(signData, 'utf-8')).digest('hex');
//   vnpParams['vnp_SecureHash'] = secureHash;

//   // Tạo URL với mã hóa đúng cho trình duyệt
//   const vnpUrl = `${process.env.VNP_URL}?${querystring.stringify(vnpParams, { encode: true })}`;

//   console.log('vnpParams:', vnpParams);
//   console.log('signData:', signData);
//   console.log('Generated URL:', vnpUrl);
//   res.json({ url: vnpUrl });
// };

// exports.vnpayReturn = (req, res) => {
//   let vnpParams = req.query;
//   const secureHash = vnpParams['vnp_SecureHash'];

//   delete vnpParams['vnp_SecureHash'];
//   delete vnpParams['vnp_SecureHashType'];

//   vnpParams = sortObject(vnpParams);

//   const signData = Object.keys(vnpParams)
//     .map((key) => `${key}=${vnpParams[key]}`)
//     .join('&');
//   const hmac = crypto.createHmac('sha512', process.env.VNP_HASHSECRET);
//   const signed = hmac.update(Buffer.from(signData, 'utf-8')).digest('hex');

//   if (secureHash === signed) {
//     const responseCode = vnpParams['vnp_ResponseCode'];
//     if (responseCode === '00') {
//       res.json({ status: 'success', message: 'Thanh toán thành công', data: vnpParams });
//     } else {
//       res.json({ status: 'error', message: 'Thanh toán thất bại', data: vnpParams });
//     }
//   } else {
//     res.json({ status: 'error', message: 'Chữ ký không hợp lệ' });
//   }
// };