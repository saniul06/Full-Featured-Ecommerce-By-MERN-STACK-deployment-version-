const app = require('./app')

const connectDatabase = require('./config/database')

// const dotenv = require('dotenv')

const cors = require('cors');

const cloudinary = require('cloudinary')

app.use(cors());

// dotenv.config({ path: 'backend/config/config.env' })
if (process.env.NODE_ENV !== 'PRODUCTION') require('dotenv').config({ path: 'backend/config/config.env' })

//CONFIG cloudinary

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API,
    api_secret: process.env.CLOUDINARY_SECRET
})

process.on('uncaughtException', err => {
    console.log(`the error is: ${err.message}`)
    console.log(`the error is: ${err.stack}`)
    process.exit(1)

})

connectDatabase()

const server = app.listen(process.env.PORT, () => {
    console.log(`server started at port ${process.env.PORT} in ${process.env.NODE_ENV}`)
})

// server.setTimeout(() => {
//     res.status(400).json({
//         errorMessage: 'timeout'
//     }, 2000)
// });



process.on('unhandledRejection', err => {
    console.log(`the unhandle error is ${err.message}`)
    console.log(`the unhandle error is ${err.stack}`)
    console.log('sutting down server')
    server.close(() => process.exit(1))
})
