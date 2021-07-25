const asyncErrorHandler = require('../middlewares/asyncErrorHandler')
const User = require('../models/user')
const ErrorHandler = require('../utils/Errors')
const sendToken = require('../utils/jwtToken')
const cloudinary = require('cloudinary')

exports.getUserProfile = asyncErrorHandler(async (req, res, next) => {
    const user = await User.findById(req.user._id)

    res.status(200).json({
        success: true,
        user
    })
})

exports.allUsers = asyncErrorHandler(async (req, res, next) => {
    const users = await User.find({ role: 'user' })

    res.status(200).json({
        success: true,
        users
    })
})

exports.updatePassword = asyncErrorHandler(async (req, res, next) => {

    const { oldPassword, newPassword, confirmPassword } = req.body
    console.log('passwords: ', oldPassword, newPassword, confirmPassword)

    if (!oldPassword || !newPassword || !confirmPassword) {
        return next(new ErrorHandler('Please give password', 400))
    }

    const user = await User.findById(req.user._id).select('+password')

    const isPasswordMatched = await user.comparePassword(oldPassword)
    console.log("isPasswordMatched is: ", isPasswordMatched)

    if (!isPasswordMatched) {
        return next(new ErrorHandler('Old password do not match', 400))
    }

    if (newPassword !== confirmPassword) {
        return next(new ErrorHandler('New password do not match', 400))
    }

    user.password = newPassword
    await user.save()
    // sendToken(user, 200, res)
    res.status(200).json({
        success: true,
        message: 'Password updated successfully'
    })

})

exports.updateProfile = asyncErrorHandler(async (req, res, next) => {

    const { name, email, avatar } = req.body

    if (!name || !email) {
        console.log('fill the form')
        return next(new ErrorHandler('Please fill the form', 400))
    }

    if (avatar) {
        const user = await User.findById(req.user._id)
        const image_id = user.avatar.public_id

        await cloudinary.v2.uploader.destroy(image_id)

        var result = await cloudinary.v2.uploader.upload(avatar, {
            folder: 'avatars',
            width: 150,
            crop: 'scale'
        })
    }

    if (result) {
        console.log('avatar exist')
        var updatedUserData = {
            name,
            email,
            avatar: {
                public_id: result.public_id,
                url: result.secure_url
            },
        }
    } else {
        console.log('avatar do not exists')
        var updatedUserData = {
            name,
            email
        }
    }

    const user = await User.findByIdAndUpdate(req.user._id, updatedUserData, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    })

    res.status(200).json({
        success: true,
        user,
        message: 'Profile updated successfully'
    })
})