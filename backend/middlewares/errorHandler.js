const ErrorHandler = require('../utils/Errors')

module.exports = (err, req, res, next) => {

    err.statusCode = err.statusCode || 500;
    err.message = err.message || 'Internal Server Error'

    if (process.env.NODE_ENV === 'DEVELOPMENT') {
        res.status(err.statusCode).json({
            success: false,
            erorr: err,
            errorMessage: err.message,
            stack: err.stack
        })
    }

    if (process.env.NODE_ENV === 'PRODUCTION') {

        let error = { ...err }
        error.message = err.message

        // Invalid Id error handling
        if (err.name === 'CastError') {
            error.message = `Resource not found. Invalid ${err.path}`
            error.statusCode = 400
        }

        // Handle required field error
        if (err.name === 'ValidationError') {
            let arr = Object.values(err.errors).map(val => val.message)
            error = new ErrorHandler(arr, 404)
            // error.message = arr;
            // error.statusScode = 404
        }

        // Handle duplicate field
        if (err.code === 11000) {
            // error.message = `Duplicate ${Object.keys(err.keyValue)} is not allowed`
            const message = `Duplicate ${Object.keys(err.keyValue)} is not allowed`
            error = new ErrorHandler(message, 400)
        }

        // Handle JWT token error

        if (err.name === 'JsonWebTokenError') {
            const message = 'Json web token is invalid. Try again'
            error = new ErrorHandler(message, 400)
        }

        // Handle JWT token expire error

        if (err.name === 'TokenExpiredError') {
            const message = 'Json web token is expired. Try again'
            error = new ErrorHandler(message, 400)
        }

        res.status(error.statusCode).json({
            success: false,
            errorMessage: error.message
        })

    }
}