// import .env
require('dotenv').config()

// import packages
const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

// import model
const Person = require('./model/Person.model')

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

// find single
app.get('/find-single', async (req, res) => {
    const { name } = req.body

    try{
        let person = await Person.findOne({ name })
        res.status(200).json({
            person
        })
    }
    catch(err) {
        handleError(err)
    }
})

// find all people
app.get('/find-all', async (req ,res) => {
    try{
        let people = await Person.find({})
        res.status(200).json({
            people
        })
    }
    catch(err) {
        handleError(err)
    }
})

// add person route
app.post('/add', async (req, res) => {
    const { name, age, height } = req.body

    try{
        const person = await Person.create({
            name,
            age,
            height
        })
        res.status(200).json({
            message: "Person added successfully"
        })
    }
    catch(err) {
        handleError(err)
    }
})

// delete single
app.post('/delete-one', async (req, res) => {
    const { name } = req.body

    try{
        await Person.deleteOne({ name })
        res.status(204).json({
            message: "Person deleted successfully"
        })
    }
    catch(err) {
        handleError(err)
    }

})

// delete multiple
app.post('/delete-multiple', async (req, res) => {
    const { min_age } = req.body
    try{
        await Person.deleteMany({ age: {$gt: min_age} })
        res.status(204).json({
            message: "People deleted successfully"
        })
    }
    catch(err) {
        handleError(err)
    }
})



app.listen(port, (req, res) => {
    console.log("Server running on port : " + port);
})