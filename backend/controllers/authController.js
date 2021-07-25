const asyncErrorHandler = require('../middlewares/asyncErrorHandler')
const User = require('../models/user')
const ErrorHandler = require('../utils/Errors')
const sendToken = require('../utils/jwtToken')
const sendResetPasswordEmail = require('../utils/sendResetPasswordEmail')
const crypto = require('crypto')
const cloudinary = require('cloudinary')

exports.registerUser = asyncErrorHandler(async (req, res, next) => {
    const { name, email, password, avatar } = req.body

    // const result = await cloudinary.v2.uploader.upload(avatar, {
    //     folder: 'avatars',
    //     width: 150,
    //     crop: 'scale'
    // })

    if (!name || !email || !password || !avatar) {
        return next(new ErrorHandler('Please fill the form', 400))
    }

    const result = await cloudinary.v2.uploader.upload(avatar, {
        folder: 'avatars',
        width: 150,
        crop: 'scale'
    })

    const user = await User.create({
        name,
        email,
        password,
        avatar: {
            public_id: result.public_id,
            url: result.secure_url
        },

    })

    sendToken(user, 201, res)
})

exports.loginUser = asyncErrorHandler(async (req, res, next) => {
    const { email, password } = req.body;
    console.log(email, password)

    if (!email || !password) {
        return next(new ErrorHandler('Please enter email & password', 400))
    }

    const user = await User.findOne({ email }).select('+password');

    if (!user) {
        return next(new ErrorHandler('Invalid email or password', 401))
    }

    const isPasswordMatched = await user.comparePassword(password)

    if (!isPasswordMatched) {
        return next(new ErrorHandler('Invalid email or password', 401))
    }

    sendToken(user, 200, res)
})

exports.logoutUser = asyncErrorHandler(async (req, res, next) => {
    res.cookie('token', null, {
        expires: new Date(Date.now()),
        httpOnly: true
    })

    res.status(200).json({
        success: true,
        message: 'Logout successfully'
    })
})

exports.forgotPassword = asyncErrorHandler(async (req, res, next) => {
    console.log('email: ', req.body.email)
    const user = await User.findOne({ email: req.body.email })
    if (!user) {
        return next(new ErrorHandler('No user found with this email', 404))
    }

    const resetToken = user.getResetPasswordToken();

    await user.save({ validateBeforeSave: false })

    const resetUrl = `${req.protocol}://${req.get('host')}/password/reset/${resetToken}`
    // const resetUrl = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`/

    const message = `Your password reset token is as follow: \n\n${resetUrl}\n\nIf you have not requested this email, then ignore it.`

    try {
        await sendResetPasswordEmail({
            email: user.email,
            subject: 'Shop password recover',
            message
        })

        res.status(200).json({
            success: true,
            message: 'Check your email to update password'
        })
    } catch (err) {
        user.resetPasswordToken = undefined
        user.resetPasswordExpire = undefined

        await user.save({ validateBeforeSave: false })

        return next(new ErrorHandler(err.message, 500))
    }

})

exports.resetPassword = asyncErrorHandler(async (req, res, next) => {
    const resetPasswordToken = crypto.createHash('sha256').update(req.params.token).digest('hex')
    const user = await User.findOne({
        resetPasswordToken,
        resetPasswordExpire: { $gt: Date.now() }
    })

    if (!user) {
        return next(new ErrorHandler('Invalid token or token is expired', 400))
    }

    if (req.body.password !== req.body.confirmPassword) {
        return next(new ErrorHandler('Password doesn\'t match', 401))
    }

    user.password = req.body.password

    user.resetPasswordToken = undefined
    user.resetPasswordExpire = undefined

    await user.save()

    // sendToken(user, 200, res)
    res.status(200).json({
        success: true,
        message: "Password updated successfully"
    })

})

