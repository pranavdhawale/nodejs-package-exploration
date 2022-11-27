const express = require('express');
const bodyParser = require('body-parser');

// import .env variables
require('dotenv').config();

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const port = 4000;

// import nodemailer controller
// const controller = require('./nodemailer');

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.post('/', (req, res) => {
    const nodemailer = require('nodemailer');

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL,
            pass: process.env.PASSWORD
        },
        port: 465,
        host: 'smtp.gmail.com'
    });

    const mailOptions = {
        from: process.env.EMAIL,
        to: /*email address to send mail to*/"",
        subject: "Sending Email using Node.js",
        text: 'Hello!\n' + 'Pranav here'
    };

    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
            res.send('Email sent: ' + info.response);
        }
    });
});


app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
