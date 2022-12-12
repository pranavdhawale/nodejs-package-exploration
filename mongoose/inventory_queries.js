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

app.post('/insert-many', async (req, res) => {
    const data = req.body
    // console.log(data);

    try {
        data.forEach(async element => {
            await Inventory.create({
                item: element.item,
                qty: element.qty,
                size: {
                    h: element.size.h,
                    w: element.size.w,
                    uom: element.size.uom
                },
                status: element.status
            })
        });
        res.status(201).json({
            message: "Items added successfully",
            data
        })

    }
    catch(err)
    {
        console.log(err);
    }
})

app.get('/get-all', async (req, res) => {
    try {
        let items = await Inventory.find({})
        res.status(200).json({
            items
        })
    }
    catch(err) {
        console.log(err);
    }
})

app.get('/get-status', async (req, res) => {
    const { status } = req.body
    try {
        let items = await Inventory.find({ status })
        res.status(200).json({
            items
        })
    }
    catch(err) {
        console.log(err);
    }
})

app.get('/get-multiple-status', async (req, res) => {
    const { status1, status2 } = req.body
    try {
        let items = await Inventory.find({ status: { $in: [status1, status2]} })
        res.status(200).json({
            items
        })
    }
    catch(err) {
        console.log(err);
    }
})

app.get('/and', async (req, res) => {
    const { status, qty } = req.body
    try {
        let items = await Inventory.find({ status, qty: { $lt: qty} })
        res.status(200).json({
            items
        })
    }
    catch(err) {
        console.log(err);
    }
})

app.get('/or', async (req, res) => {
    const { status, qty } = req.body
    try {
        let items = await Inventory.find({ $or: [ { status: status }, { qty: { $lt: qty } } ] })
        res.status(200).json({
            items
        })
    }
    catch(err) {
        console.log(err);
    }
})

app.get('/and-or', async (req, res) => {
    const { status, qty } = req.body
    try {
        let items = await Inventory.find({ status, $or: [ { status: status }, { qty: { $lt: qty } } ] })
        res.status(200).json({
            items
        })
    }
    catch(err) {
        console.log(err);
    }
})

app.listen(port, (req, res) => {
    console.log("Server running on port : " + port);
})