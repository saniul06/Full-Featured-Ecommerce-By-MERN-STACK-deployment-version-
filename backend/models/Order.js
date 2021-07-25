const mongoose = require('mongoose')

const orderSchema = new mongoose.Schema({
    shippingInfo: {
        address: {
            type: String,
            required: true
        },
        city: {
            type: String,
            required: true
        },
        country: {
            type: String,
            required: true
        },
        postalCode: {
            type: String,
            required: true
        },
        phoneNo: {
            type: String,
            required: true
        },
    },
    user: {
        type: mongoose.ObjectId,
        ref: 'user'
    },
    orderItems: [
        {
            name: {
                type: String,
                required: true
            },
            price: {
                type: String,
                required: true
            },
            quantity: {
                type: String,
                required: true
            },
            image: {
                type: String,
                required: true
            },
            productId: {
                type: mongoose.ObjectId,
                required: true,
                ref: 'Product'
            },
        }
    ],
    paymentInfo: {
        id: {
            type: String,
        },
        status: {
            type: String,
        }
    },
    itemsPrice: {
        type: Number,
        required: true,
        default: 0
    },
    taxPrice: {
        type: Number,
        required: true,
        default: 0
    },
    shippingPrice: {
        type: Number,
        required: true,
        default: 0
    },
    totalPrice: {
        type: Number,
        required: true,
        default: 0
    },
    orderStatus: {
        type: String,
        required: true,
        default: 'processing'
    },
    paidAt: Date,
    delivereddAt: Date,
    createdAt: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('Order', orderSchema)