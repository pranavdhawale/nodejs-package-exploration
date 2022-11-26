const express = require('express');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
const fs = require('fs');
const { google } = require('googleapis');
const keys = require('./keys.json');

const app = express();
multer({ dest: './uploads/' });

const port = 3000;

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.post('/', upload.single('file'), (req, res) => {
    const client = new google.auth.JWT(
        keys.client_email,
        null,
        keys.private_key,
        ['https://www.googleapis.com/auth/drive']
    );

    client.authorize(function(err, tokens) {
        if(err) {
            console.log(err);
            return;
        }
        else {
            console.log('Connected to Drive API');
            gdrun(client);
        }
    });

    async function gdrun(cl) {
        const gdapi = google.drive({ version: 'v3', auth: cl });

        const fileMetadata = {
            'name': req.file.originalname,
            'parents': ['1thB_k9eQEeFzxzTiUNY7-235DFAm3Jl8']
        };

        const media = {
            mimeType: req.file.mimetype,
            body: fs.createReadStream(req.file.path)
        };

        const file = await gdapi.files.create({
            resource: fileMetadata,
            media: media,
            fields: 'id'
        });

        fs.unlink(req.file.path, (err) => {
            if(err) {
                console.log(err);
            }
            else {
                console.log('File deleted');
            }
        });

        console.log(file.data.id);
        res.send('File uploaded to Google Drive\nhttps://drive.google.com/open?id=' + file.data.id);
    }

    // call the function
    gdrun().then(() => {
        console.log('File uploaded successfully.');
    }
    ).catch((err) => {
        console.log(err);
    });
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});