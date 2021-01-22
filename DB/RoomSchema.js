const mongoose = require('mongoose')

const device = new mongoose.Schema({
    roomName: { type: String, required: true},
    imageUrl: { type: String, required: true}
});

module.exports = Room = mongoose.model('rooms', device)