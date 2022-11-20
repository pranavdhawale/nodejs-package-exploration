const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'fw20co001@gmail.com',
        pass: 'myrollno'
    }
});

const mailOptions = {
    from: 'fw20co001@gmail.com',
    to: 'pranavdhawale19@gmail.com',
    subject: 'Sending Email using Node.js',
    text: 'That was easy!'
};

transporter.sendMail(mailOptions, function(error, info){
    if (error) {
        console.log(error);
    } else {
        console.log('Email sent: ' + info.response);
    }
});