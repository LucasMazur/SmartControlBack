const mongoose = require('mongoose')
require('dotenv').config()

const uri = process.env.DB_CONNECTION

const connectDB = async () => {
    await mongoose.connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true
    });
    console.log("db connected")
}

module.exports = connectDB