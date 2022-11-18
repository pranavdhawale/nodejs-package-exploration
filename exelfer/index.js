const express = require('express');
const fs = require('fs');
const upload = require('express-fileupload');
const importExcel = require('convert-excel-to-json');

const app = express();
app.use(upload());

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.post('/', (req, res) => {
    if(!req.files) {
        res.send('No file uploaded');
    }
    else {
        console.log(req.files);
        let file = req.files.file;
        let filename = file.name;
        file.mv('./excel/' + filename, (err) => {
                if(err) {
                    res.send(err);
                }
                else {
                    let result = importExcel({
                        sourceFile: './excel/' + filename,
                        header: {
                            rows: 1
                        },
                        columnToKey: {
                            A: 'name',
                            B: 'password'
                        },
                        sheets: ['Sheet1']
                    });
                    res.send(result);
                    // console.log(result);
                    // res.send('File ' + filename + ' uploaded');
                    fs.rm('./excel/' + filename, { recursive: true, force: true }, (err) => {
                        if(err) {
                            console.log(err);
                        }
                        else {
                            console.log('File deleted');
                        }
                    });
                }
            });
    }
});


app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
