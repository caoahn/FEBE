// server/stripeController.js
const Stripe = require('stripe');
const stripe = Stripe(process.env.STRIPE_SECRET_KEY); // thay bằng Secret key thật

exports.createPaymentIntent = async (req, res) => {
  const { amount } = req.body; // amount tính theo đơn vị cents (ví dụ 1000 = $10)

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount,
      currency: 'usd', // hoặc 'vnd' tùy bạn
      automatic_payment_methods: {
        enabled: true,
      },
    });

    res.send({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send({ error: err.message });
  }
};

exports.createCheckoutSession = async (req, res) => {
  const { line_items, success_url, cancel_url } = req.body; // line_items là danh sách sản phẩm trong giỏ hàng

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: line_items,
      mode: 'payment',
      success_url: success_url,
      cancel_url: cancel_url,
    });
    res.send({ id: session.id });
  } catch (err) {
    console.error(err);
    res.status(500).send({ error: err.message });
  }
}
