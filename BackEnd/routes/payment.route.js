const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/payment.controller');

// router.post('/create_payment_url', paymentController.createPayment);
// router.get('/vnpay_return', paymentController.vnpayReturn);


// Tạo đơn hàng
router.post('/create-order', paymentController.createOrder);

// Xử lý callback từ ZaloPay
router.post('/callback', paymentController.handleCallback);

// Kiểm tra trạng thái đơn hàng
router.post('/check-order-status', paymentController.checkOrderStatus);

module.exports = router;