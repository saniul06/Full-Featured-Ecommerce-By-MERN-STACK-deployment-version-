const asyncErrorHandler = require('../middlewares/asyncErrorHandler')
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)
console.log('paymentController: ', process.env.STRIPE_API_KEY)

// stripe payment
exports.processPayment = asyncErrorHandler(async (req, res, next) => {
    const paymentIntent = await stripe.paymentIntents.create({
        amount: req.body.amount,
        currency: 'usd',
        metadata: {
            integration_check: 'accept_a_payment'
        }
    })

    res.status(200).json({
        success: true,
        client_secret: paymentIntent.client_secret
    })
})

// send stripe api_key
exports.sendStripeApiKey = asyncErrorHandler(async (req, res, next) => {
    res.status(200).json({
        stripteApiKey: process.env.STRIPE_API_KEY
    })
})