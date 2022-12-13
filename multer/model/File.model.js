const mongoose = require('mongoose')
const Schema = mongoose.Schema

const File = new Schema({
    originalName: String,
    fileName: String,
    path: String
})

module.exports = mongoose.model('File', File)