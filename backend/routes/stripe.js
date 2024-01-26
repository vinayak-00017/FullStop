const express = require('express');
require('dotenv').config();
const stripe = require('stripe')(process.env.STRIPE_KEY)

const router = express.Router()

router.post('/create-checkout-session', async (req, res) => {

  const line_items = req.body.sCart.map(item => {
    return {
      price_data: {
        currency: 'usd',
        product_data: {
          name: item.item.productName,
          images:[item.item.imgLink],
          metadata : {
            id : item.item._id,
            size : item.size
          }
        },
        unit_amount: Math.round((item.item.price-(item.item.discount*item.item.price)/100) * 100),
      },
      quantity: item.quantity
    }
  })

  const session = await stripe.checkout.sessions.create({
    line_items,
    mode: 'payment',
    success_url: `${process.env.CLIENT_URL}/checkout-success`,
    cancel_url: `${process.env.CLIENT_URL}/cart`,
  });

  res.json({url : session.url});
});

module.exports = router
