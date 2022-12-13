// import .env
require('dotenv').config()

// import packages
const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

// import model
const Aviation = require('./model/Aviation.model')

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
const mongouri =  `mongodb+srv://admin:${process.env.AGGREGATION_QUERIES}@aggregation-queries.gcsa7p8.mongodb.net/?retryWrites=true&w=majority`
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
    console.log(data);

    try {
        data.forEach(async element => {
            await Aviation.create({
                Activity_Period: element.Activity_Period,
                Operating_Airline: element.Operating_Airline,
                Operating_Airline_IATA_Code: element.Operating_Airline_IATA_Code,
                Published_Airline: element.Published_Airline,
                Published_Airline_IATA_Code: element.Published_Airline_IATA_Code,
                GEO_Summary: element.GEO_Summary,
                GEO_Region: element.GEO_Region,
                Activity_Type_Code: element.Activity_Type_Code,
                Price_Category_Code: element.Price_Category_Code,
                Terminal: element.Terminal,
                Boarding_Area: element.Boarding_Area,
                Passenger_Count: element.Passenger_Count
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

// operating airline - TACA
// activity type code - deplaned

app.get('/oa-atc', async (req, res) => {
    const { oa, atc } = req.body

    try {
        let items = await Aviation.find({ Operating_Airline: oa, Activity_Type_Code: atc })
        res.status(200).json({
            items
        })
    }
    catch(err) {
        console.log(err);
    }

})


// 
//          AGGREGATION PIPELINE
// 

app.get('/aggregate-pipeline', async (req, res) => {
    const { oa, atc } = req.body

    try {
        let items = await Aviation.find({ Operating_Airline: oa, Activity_Type_Code: atc })
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