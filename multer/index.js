require('dotenv').config()

const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

const app = express()

app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
mongoose.set('strictQuery', false)

const port = 8000

app.get('/', (req, res) => {
    res.status(200).json({
        message: "testing"
    })
})

app.listen(port, (req, res) => {
    console.log("Server running on port : " + port);
})
