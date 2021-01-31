const { response } = require('express')
const express = require('express')
const mongoose = require('mongoose')
const deviceSchema = require('../DB/DeviceSchema')
const route = express.Router()

route.post('/save', async(req, res) => {
    const { roomName, deviceName, ip, out } = req.body
    let device = {};
    device.deviceName = deviceName
    device.ip = ip
    device.out = out

    const model = mongoose.model(`${roomName}`, deviceSchema)

    let deviceModel = new model(device)
    
    await deviceModel.save((err) => {
        if (!err) {
            console.log("Device Saved Succeful!!")
            res.json(deviceModel)
        } else {
            res.send("Data Base err")
        }
    })
})

route.post('/get', async (req, res) => {  
    const roomName = req.body.roomName
    const model = mongoose.model(`${roomName}`, deviceSchema)

    await model.find({}, (err, doc) => {
        if (!err) {
            res.json(doc)
        } else {
            res.send("Data Base err")
        }        
    })
})

route.post('/remove', async (req, res) => {

    const roomName = req.body.roomName
    const model = mongoose.model(`${roomName}`, deviceSchema)
    
    await model.findById(req.body.del, async (err, doc) => {
        console.log(doc)
        if (!err) {
            await doc.remove()
            res.json(doc)
        } else {
            res.send("Data Base Err")
        }
    })
})

module.exports = route