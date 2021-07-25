const User = require('../models/user')
const asyncErrorHandler = require('../middlewares/asyncErrorHandler')
const ErrorHandler = require('../utils/Errors')

exports.getallUser = asyncErrorHandler(async (req, res, next) => {
    const user = await User.find()

    res.status(200).json({
        success: true,
        user
    })
})

exports.getUserDetails = asyncErrorHandler(async (req, res, next) => {
    const user = await User.findById(req.params.id)

    if (!user) {
        return next(new ErrorHandler(`User not found with this id: ${req.params.id}`))
    }

    res.status(200).json({
        success: true,
        user
    })

})

exports.updateUserDetails = asyncErrorHandler(async (req, res, next) => {
    const updatedData = {
        name: req.body.name,
        email: req.body.email,
        role: req.body.role
    }

    const user = await User.findByIdAndUpdate(req.params.id, updatedData, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    })

    if (!user) {
        return next(new ErrorHandler(`User not found with this id: ${req.params.id}`, 400))
    }

    res.status(200).json({
        success: true,
        user
    })
})

exports.deleteUser = asyncErrorHandler(async (req, res, next) => {

    const user = await User.findByIdAndDelete(req.params.id)

    if (!user) {
        return next(new ErrorHandler(`User not found with this id: ${req.params.id}`))
    }

    res.status(200).json({
        success: true,
        message: 'User deleted Successfully'
    })
})