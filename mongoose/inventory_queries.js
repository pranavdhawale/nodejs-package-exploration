// import .env
require('dotenv').config()

// import packages
const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

// import model
const Inventory = require('./model/Inventory.model')

// express app
const app = express()

// server port
const port = 8000

// dependencies
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
mongoose.set('strictQuery', false)

// connect to mongodb
const mongouri =  `mongodb+srv://admin:${process.env.ATLAS_PASSWORD}@mongoose.got2tml.mongodb.net/?retryWrites=true&w=majority`
mongoose.connect(mongouri, { useNewUrlParser: true });
const connection = mongoose.connection;

connection.once('open', function() {
    console.log('MongoDB database connection established successfully!');
    }
);

// test route
app.get('/', (req, res) => {
    res.status(200).json({
        message: "testing"
    })
})

app.listen(port, (req, res) => {
    console.log("Server running on port : " + port);
})