const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const crypto = require('crypto');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please enter your name'],
        max: [30, 'Your name can not exceed 30 characters']
    },
    email: {
        type: String,
        required: [true, 'Plsear provide your email address'],
        unique: true,
        validate: [validator.isEmail, 'Please enter a valid email address']
    },
    password: {
        type: String,
        required: [true, 'Please enter a password'],
        minlength: [4, 'Password must be longer than 3 characters'],
        select: false
    },
    avatar: {
        public_id: {
            type: String,
            required: true
        },
        url: {
            type: String,
            required: true
        }
    },
    role: {
        type: String,
        default: 'user'
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date
})

// Encrypt password
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        next()
    }
    this.password = await bcrypt.hash(this.password, 10)
})

// Compare Password
userSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password)
}

// Create reset password token
userSchema.methods.getResetPasswordToken = function () {
    const resetToken = crypto.randomBytes(28).toString('hex')

    this.resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex')

    this.resetPasswordExpire = Date.now() + (30 * 60 * 1000)

    return resetToken
}

// create jwt token
userSchema.methods.getJwtToken = function () {
    return jwt.sign(
        {
            _id: this._id,
            role: this.role
        },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRES_TIME })
}

module.exports = mongoose.model('user', userSchema)