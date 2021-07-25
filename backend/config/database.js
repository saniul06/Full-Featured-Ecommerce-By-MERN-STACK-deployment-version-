const mongoose = require('mongoose')

const connectDatabase = () => {
    mongoose.connect(process.env.DB__URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
    })
        .then(con => {
            console.log(`database connected at hosttttttttttttttttttttttttttttttt: ${con.connection.host}`)
        })
}

module.exports = connectDatabase