const express = require('express');
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
                    del(['./excel/' + filename])
                        .then(paths => {
                            console.log('Deleted files and folders:\n', paths.join('\n'));
                        });
                }
            });
    }
});


app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
