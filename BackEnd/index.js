const express = require("express");
const database = require("./config/database");
require("dotenv").config();
const cors = require("cors");
const bodyParser = require("body-parser");
const routes = require("./routes/index.route");
const { errorHandler, notFound } = require("./middleware/errors");
const axios = require('axios').default; // npm install axios
const qs = require('qs'); // npm install qs
const CryptoJS = require("crypto-js"); // npm install crypto-js
const moment = require("moment"); // npm install moment
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const app = express();
const port = process.env.PORT;

app.use(cors());
database.connect();

const fileUpload = require("express-fileupload");
app.use(
  fileUpload({
    useTempFiles: true,
  })
);

const config = {
  app_id: '554',
  key1: '8NdU5pG5R2spGHGhyO99HN1OhD8IQJBn',
  key2: 'uUfsWgfLkRLzq6W2uNXTCxrfxs51auny',
  endpoint: 'https://sb-openapi.zalopay.vn/v2/create',
};

//parse application/json
app.use(bodyParser.json());

// Route tạo checkout session
// app.post('/api/create-checkout-session', async (req, res) => {
//   try {
//     const { products } = req.body;
    
//     // Tạo line_items từ products
//     const lineItems = products.map(product => ({
//       price_data: {
//         currency: 'vnd', // hoặc 'usd', tùy theo cấu hình của bạn
//         product_data: {
//           name: product.name,
//           images: [product.image], // nếu có
//         },
//         unit_amount: product.price, // đảm bảo price đúng định dạng (VND phải là số nguyên)
//       },
//       quantity: product.quantity,
//     }));

//     const session = await stripe.checkout.sessions.create({
//       payment_method_types: ['card'],
//       line_items: lineItems,
//       mode: 'payment',
//       success_url: `http://localhost:3009/success?session_id={CHECKOUT_SESSION_ID}`,
//       cancel_url: `http://localhost:3009/`,
//     });

//     res.json({ id: session.id, url: session.url });
//   } catch (error) {
//     console.error('Lỗi tạo checkout session:', error);
//     res.status(500).json({ error: error.message });
//   }
// });

app.post('/api/create-checkout-session', async (req, res) => {
  try {
    const { products, customerId, customerEmail } = req.body;
    
    // Tạo line_items từ products
    const lineItems = products.map(product => ({
      price_data: {
        currency: 'vnd',
        product_data: {
          name: product.name,
          images: [product.image], // nếu có
        },
        unit_amount: product.price,
      },
      quantity: product.quantity,
    }));

    // Tùy chọn để tạo Checkout Session
    const sessionOptions = {
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      success_url: `http://localhost:3009/payment-success`,
      cancel_url: `http://localhost:3009/`,
    };

    // Nếu có customerId từ Stripe, sử dụng nó
    if (customerId) {
      sessionOptions.customer = customerId;
    } 
    // Nếu không có customerId nhưng có email, tạo customer mới hoặc tìm customer hiện có
    else if (customerEmail) {
      // Tìm customer dựa trên email
      const customers = await stripe.customers.list({
        email: customerEmail,
        limit: 1,
      });
      
      if (customers.data.length > 0) {
        // Sử dụng customer đã tồn tại
        sessionOptions.customer = customers.data[0].id;
      } else {
        // Tạo customer mới
        const newCustomer = await stripe.customers.create({
          email: customerEmail,
          // Thêm các thông tin khác nếu có (tên, số điện thoại, địa chỉ...)
        });
        sessionOptions.customer = newCustomer.id;
      }
    }

    // Tùy chọn: Lưu thông tin khách hàng
    // sessionOptions.customer_email = customerEmail;

    // Tạo session
    const session = await stripe.checkout.sessions.create(sessionOptions);

    // Trả về ID session và URL thanh toán
    res.json({ 
      id: session.id, 
      url: session.url,
      // Nếu bạn muốn lưu customerId vào database của mình
      customerId: sessionOptions.customer 
    });
  } catch (error) {
    console.error('Lỗi tạo checkout session:', error);
    res.status(500).json({ error: error.message });
  }
});

// API lấy danh sách thanh toán theo khách hàng
app.get('/api/payments/:customerId', async (req, res) => {
  try {
    const { customerId } = req.params;
    
    // Lấy danh sách thanh toán từ Stripe
    const paymentIntents = await stripe.paymentIntents.list({
      customer: customerId,
      limit: 100, // Số lượng kết quả tối đa
    });
    console.log(paymentIntents);
    
    res.json(paymentIntents.data);
  } catch (error) {
    console.error('Lỗi khi lấy danh sách thanh toán:', error);
    res.status(500).json({ error: error.message });
  }
});

// API lấy danh sách các phiên thanh toán
app.get('/api/checkout-sessions', async (req, res) => {
  try {
    const { customer, limit = 10 } = req.query;
    const params = { limit: parseInt(limit), expand: ['data.line_items'] };
    if (customer) params.customer = customer;

    const sessions = await stripe.checkout.sessions.list(params);

    res.json(sessions.data);
  } catch (error) {
    console.error('Lỗi khi lấy danh sách phiên thanh toán:', error);
    res.status(500).json({ error: error.message });
  }
});


// API lấy chi tiết của một phiên thanh toán
app.get('/api/checkout-sessions/:sessionId', async (req, res) => {
  try {
    const { sessionId } = req.params;
    const session = await stripe.checkout.sessions.retrieve(sessionId, {
      expand: ['line_items', 'payment_intent']
    });
    res.json(session);
  } catch (error) {
    console.error('Lỗi khi lấy chi tiết phiên thanh toán:', error);
    res.status(500).json({ error: error.message });
  }
});

// API lấy danh sách các phiên thanh toán
app.get('/api/checkout-sessions', async (req, res) => {
  try {
    const { customer, limit = 10 } = req.query;
    
    const sessions = await stripe.checkout.sessions.list({
      customer,
      limit: parseInt(limit),
      expand: ['data.line_items']
    });
    
    res.json(sessions.data);
  } catch (error) {
    console.error('Lỗi khi lấy danh sách phiên thanh toán:', error);
    res.status(500).json({ error: error.message });
  }
});

// Route webhook để nhận thông báo từ Stripe
app.post('/webhook', express.raw({type: 'application/json'}), async (req, res) => {
  const sig = req.headers['stripe-signature'];
  let event;

  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // Xử lý sự kiện thanh toán thành công
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;
    // Xử lý logic sau khi thanh toán thành công
    // Ví dụ: cập nhật database, gửi email xác nhận, v.v.
  }

  res.json({ received: true });
});

routes(app);

// ERROR HANDLE
app.use(notFound);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
