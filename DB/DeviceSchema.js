const mongoose = require('mongoose')

const device = new mongoose.Schema({
    deviceName: { type: String, required: true },
    ip: { type: String, required: true }
});

module.exports = device