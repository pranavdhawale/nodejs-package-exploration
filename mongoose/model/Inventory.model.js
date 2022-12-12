const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Inventory = new Schema({
    item: String,
    qty: Number,
    size: {
        h: Number,
        w: Number,
        uom: String
    },
    status: String
})

module.exports = mongoose.model('Inventory', Inventory)