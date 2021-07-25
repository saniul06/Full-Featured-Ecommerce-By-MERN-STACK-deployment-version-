const ErrorHandler = require('../utils/Errors')
const asyncErrorHandler = require('../middlewares/asyncErrorHandler')
const Product = require('../models/Product')
const Order = require('../models/Order')

exports.newOrder = asyncErrorHandler(async (req, res, next) => {
    const {
        orderItems,
        shippingInfo,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
        paymentInfo
    } = req.body

    const order = await Order.create({
        orderItems,
        shippingInfo,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
        paymentInfo,
        paidAt: Date.now(),
        user: req.user._id
    })

    res.status(200).json({
        success: true,
        order
    })
})

exports.getSingleOrder = asyncErrorHandler(async (req, res, next) => {
    const order = await Order.findById(req.params.id).populate('user', 'name email')

    if (!order) {
        return next(new ErrorHandler(`No order found with this id: ${req.params.id}`, 404))
    }

    res.status(200).json({
        success: true,
        order
    })
})

exports.myOrders = asyncErrorHandler(async (req, res, next) => {
    const orders = await Order.find({ user: req.user._id })

    if (!orders) {
        return next(new ErrorHandler(`You have no orders`, 404))
    }

    res.status(200).json({
        success: true,
        orders
    })
})

exports.allOrders = asyncErrorHandler(async (req, res, next) => {
    const orders = await Order.find()

    if (!orders) {
        return next(new ErrorHandler('There are no orders yet', 404))
    }

    let totalAmount = 0

    orders.forEach(item => totalAmount += item.totalPrice)

    res.status(200).json({
        success: true,
        totalAmount,
        orders
    })
})

exports.updateOrder = asyncErrorHandler(async (req, res, next) => {
    const order = await Order.findById(req.params.id)

    if (!order) {
        return next(new ErrorHandler(`No order found with this id :${req.params.id}`))
    }

    // if (order.orderStatus === 'Delivered') {
    //     return next(new ErrorHandler('This order is already delivered', 400))
    // }

    order.orderItems.forEach(async item => await updateStock(item.productId, item.quantity, res, next))

    order.orderStatus = req.body.status
    order.delivereddAt = Date.now()
    await order.save();

    res.status(200).json({
        success: true,
        message: 'Order updated successfully'
    })

})

const updateStock = async (_id, quantity, res, next) => {
    try {
        const product = await Product.findById(_id)
        product.stock = product.stock - quantity
        await product.save({ validateBeforeSave: false })

    } catch (err) {
        // return res.status(500).json({
        //     succeess: false,
        //     message: err.stack
        // })
        return next(new ErrorHandler(err.stack, 400))
    }
}

exports.deleteeOrder = asyncErrorHandler(async (req, res, next) => {
    const order = await Order.findByIdAndDelete(req.params.id)
    if (!order) {
        return next(new ErrorHandler(`No order found with this id : ${req.params.id}`))
    }

    res.status(200).json({
        success: true,
        message: "Order deleted successfully"
    })
})