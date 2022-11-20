const express = require('express');
const app = express();
const router = express.Router();
const port = 3000;

// import nodemailer controller
const controller = require('./nodemailer');

app.get('/', (req, res) => {
    res.send('Hello World!');
});

router.get('/send', controller.send);

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
