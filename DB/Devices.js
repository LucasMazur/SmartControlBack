const mongoose = require('mongoose')

const device = new mongoose.Schema({
    roomName: { type: String, required: true},
    deviceName: { type: String, required: true },
    ip: { type: String, required: true },
    imageUrl: { type: String, required: true }
});

module.exports = Devices = mongoose.model('devices', device)