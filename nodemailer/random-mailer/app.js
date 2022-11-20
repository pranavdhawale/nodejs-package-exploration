const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const router = express.Router();

const port = 3000;

// import nodemailer controller
// const controller = require('./nodemailer');

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.post('/', (req, res) => {
    console.log(req.body);
    const { faculty_name, org_email, subject, message, link } = req.body;

    res.send("Email Sent Successfully!");

    const nodemailer = require('nodemailer');

    const transporter = nodemailer.createTransport({
        service: 'hotmail',
        auth: {
            user: 'pranavdhawale19@outlook.com',
            pass: 'OutlooK_pranav19'
        }
    });

    const mailOptions = {
        from: 'pranavdhawale19@outlook.com',
        to: org_email,
        subject: subject,
        text: 'Hello!\n' + faculty_name + ' here,' + message + '\n\n' + link
    };

    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
});

// POST route to send mail
// router.post('/send', controller.send);

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
