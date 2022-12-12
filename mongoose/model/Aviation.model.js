const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Aviation = new Schema({
    Activity_Period: Number,
    Operating_Airline: String,
    Operating_Airline_IATA_Code: String,
    Published_Airline: String,
    Published_Airline_IATA_Code: String,
    GEO_Summary: String,
    GEO_Region: String,
    Activity_Type_Code: String,
    Price_Category_Code: String,
    Terminal: String,
    Boarding_Area: String,
    Passenger_Count: Number
})

module.exports = mongoose.model('Aviation', Aviation)