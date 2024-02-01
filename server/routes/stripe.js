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

//Stripe webhook

// This is your Stripe CLI webhook secret for testing your endpoint locally.
const endpointSecret = "whsec_2946f7ac947d113662bbeb22344b6afd7c00919643b048fbd14a271a51567aab";

router.post('/webhook', express.raw({type: 'application/json'}), (request, response) => {
  const sig = request.headers['stripe-signature'];
  const payload = req.body;
  const payloadString = JSON.stringify(payload, null, 2);
  const header = stripe.webhooks.generateTestHeaderString({
    payload: payloadString,})

  let event;

  try {
    event = stripe.webhooks.constructEvent(payloadString,header, endpointSecret);
    console.log('verified')
  } catch (err) {
    response.status(400).send(`Webhook Error: ${err.message}`);
    return;
  }

  // Return a 200 response to acknowledge receipt of the event
  response.send().end();
});



module.exports = router
