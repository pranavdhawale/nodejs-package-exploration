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