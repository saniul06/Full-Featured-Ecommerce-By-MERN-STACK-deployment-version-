const Category = require('../models/Category')
const ErrorHandler = require('../utils/Errors')
const asyncErrorHandler = require('../middlewares/asyncErrorHandler')

exports.getAllCategories = asyncErrorHandler(async (req, res, next) => {
    const categories = await Category.find()

    if (!categories) {
        return next(new ErrorHandler('No category found', 404))
    }

    res.status(200).json({
        success: true,
        categories
    })

})

exports.createCategory = asyncErrorHandler(async (req, res, next) => {

    if (!req.body.name) {
        return next(new ErrorHandler('Please enter a category', 401))
    }

    await Category.create(req.body)

    res.status(201).json({
        success: true,
        message: 'Category created successfully'
    })
})