const User = require('../models/user')

const jwt = require('jsonwebtoken')

const asyncErrorHandler = require('./asyncErrorHandler')

const ErrorHandler = require('../utils/Errors')

exports.isAuthenticated = asyncErrorHandler(async (req, res, next) => {
    const { token } = req.cookies;
    if (!token) {
        return next(new Error('Login first to access the resource', 401))
    }

    const decode = jwt.verify(token, process.env.JWT_SECRET)
    req.user = await User.findById(decode._id)

    // jwt.verify(token, process.env.JWT_SECRET, (err, decode) => {
    //     if (err) {
    //         return next(new Error('Login first to access the resource', 401))
    //     }
    //     req.user = User.findById(decode._id)

    //     next()
    // })

    next()

})

exports.authorizeRoles = role => (
    (req, res, next) => {
        if (req.user.role !== role) {
            return next(new Error(`Role ${req.user.role} is not allowed to access the resource`, 403))
        }
        next()
    }
)

