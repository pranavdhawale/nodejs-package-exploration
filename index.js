const express = require('express');
const app = express();

const upload = require('express-fileupload');
const importExcel = require('convert-excel-to-json');

app.get('/', (req, res) => {
    console.log('testng');
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
