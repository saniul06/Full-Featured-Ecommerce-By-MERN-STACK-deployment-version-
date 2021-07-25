const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please enter product name'],
        trim: true,
        maxlength: [100, 'product name cann\'t exceed 30 characters']
    },
    price: {
        type: Number,
        required: [true, 'Please enter product price'],
        maxLength: [5, 'Product price cann\'t exceed 5 characters'],
        default: 0.0
    },
    description: {
        type: String,
        required: [true, 'Please enter product description'],
    },
    ratings: {
        type: Number,
        default: 0
    },
    images: [
        {
            public_id: {
                type: String,
                required: true
            },
            url: {
                type: String,
                required: true
            }
        }
    ],
    category: {
        type: String,
        required: [true, 'Please select category for this product'],
        enum: {
            values: [
                'Electronics',
                'Cameras',
                'Laptops',
                'Accessories',
                'Headphones',
                'Food',
                'Books',
                'Clothes/Shoes',
                'Sports',
                'Outdoor',
                'Home'
            ],
            message: 'Please select correct category for product'
        }
    },
    seller: {
        type: String,
        required: [true, 'Please enter product seller']
    },
    stock: {
        type: Number,
        required: [true, 'Plseae enter product stock'],
        maxlength: [5, 'Stock cann\'t excced 5 characters']
    },
    numberOfReviews: {
        type: Number,
        default: 0
    },
    reviews: [
        {
            user: {
                type: mongoose.ObjectId,
                ref: 'User',
                required: true
            },
            name: {
                type: String,
                required: [true, 'Please customer name']
            },
            rating: {
                type: Number,
                required: [true, 'Enter a rating']
            },
            comment: {
                type: String,
                required: [true, 'Please leave a comment']
            }
        }
    ],
    createdAt: {
        type: Date,
        default: Date.now
    }

})

module.exports = mongoose.model('product', productSchema)