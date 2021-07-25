const router = require('express').Router()

const { processPayment, sendStripeApiKey } = require('../controllers/paymentController')
const { isAuthenticated } = require('../middlewares/auth')

router.route('/payment/process').post(isAuthenticated, processPayment)
router.route('/stripeapi').get(isAuthenticated, sendStripeApiKey)

module.exports = router