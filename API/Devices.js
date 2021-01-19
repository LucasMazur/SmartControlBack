const { response } = require('express')
const express = require('express')
const { Mongoose } = require('mongoose')
const device = require('../DB/Devices')
const route = express.Router()

route.post('/save', async(req, res) => {
    const { roomName, deviceName, ip, imageUrl } = req.body
    let device = {};
    device.roomName = roomName
    device.deviceName = deviceName
    device.ip = ip
    device.imageUrl = imageUrl
    console.log(req.body)
    let deviceModel = new Devices (device)
    await deviceModel.save((err) => {
        if (!err) {
            console.log("Save Succeful!!")
            res.json(deviceModel) 
        } else {
            res.send("Data Base err")
        }
    })
})

route.get('/get', async (req, res) => {    
    await Devices.find({}, (err, doc) => {
        if (!err) {
            res.json(doc)
        } else {
            res.send("Data Base err")
        }
        
    })
})

route.post('/remove', async (req, res) => {
    console.log(req.body.del)  
    await Devices.findById(req.body.del, async (err, doc) => {
        console.log(doc)
        if (!err) {
            await doc.remove()
            res.json(doc)
        } else {
            res.send("Data Base Err")
        }
    })
})

route.post('/update', async (req, res) => {
    const { roomName, deviceName, ip, imageUrl, id } = req.body
    let device = {}
    device.roomName = roomName
    device.deviceName = deviceName
    device.ip = ip
    device.imageUrl = imageUrl
    device.id = id
    await Devices.findById(device.id, async (err, doc) => {
        if (roomName === "0") {
            device.roomName = doc.roomName
        }
        if (deviceName === "0") {
            device.deviceName = doc.deviceName
        }
        if (ip === "0") {
            device.ip = doc.ip
        }
        if (imageUrl === "0") {
            device.imageUrl = doc.imageUrl
        }
        await Devices.findByIdAndUpdate(device.id, {"roomName":device.roomName, "deviceName":device.deviceName, "ip":device.ip, "imageUrl":device.imageUrl}, async (err, doc) => {
            if (!err) {
                console.log("Update Succeful!!")
                res.json(doc)
            } else {
                res.send("Data Base Err")
            }
        })
    })
})

module.exports = route