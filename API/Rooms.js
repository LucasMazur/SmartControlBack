const { response } = require('express')
const express = require('express')
const mongoose = require('mongoose')
const Room = require('../DB/RoomSchema')
const route = express.Router()
const imageUrl = require('../DATA/imagesUrl')

route.post('/save', async(req, res) => {
    const { roomName } = req.body
    let room = {};
    room.roomName = roomName
    room.imageUrl= imageUrl[roomName];

    let roomModel = new Room(room)
    
    await roomModel.save((err) => {
        if (!err) {
            console.log("Room Saved Succeful!!")
            res.json(roomModel)
        } else {
            res.send("Data Base err")
        }
    })
})

route.get('/get', async (req, res) => {
    await Room.find({}, (err, doc) => {
        if (!err) {
            res.json(doc)
        } else {
            res.send("Data Base err")
        }        
    })
})

route.post('/remove', async (req, res) => {    
    await Room.findById(req.body.del, async (err, doc) => {
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
    const { roomName, imageUrl, id } = req.body
    let room = {}
    room.roomName = roomName
    room.imageUrl = imageUrl
    room.id = id
    await Room.findById(room.id, async (err, doc) => {
        if (roomName === "0") {
            room.roomName = doc.roomName
        }
        if (imageUrl === "0") {
            room.imageUrl = doc.imageUrl
        }
        await Room.findByIdAndUpdate(room.id, {"roomName":device.roomName, "imageUrl":device.imageUrl}, async (err, doc) => {
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