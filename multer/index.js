require('dotenv').config()

const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const multer = require('multer')
const upload = multer({ dest: 'uploads/' })

const app = express()
const port = 8000

app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
mongoose.set('strictQuery', false)

const File = require('./model/File.model')

// connect to mongodb
const mongouri =  `mongodb+srv://admin:${process.env.ATLAS_PASSWORD}@multer-methods.8gtctds.mongodb.net/?retryWrites=true&w=majority`
mongoose.connect(mongouri, { useNewUrlParser: true });
const connection = mongoose.connection;

connection.once('open', function() {
    console.log('MongoDB database connection established successfully!');
    }
);

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
})

app.get('/files', async (req, res) => {
    let files = await File.find({})
    res.status(200).json({
        files
    })
})

app.post('/upload-single', upload.single('file'), async (req, res) => {
    const { originalname, filename, path } = req.file

    await File.create({
        originalName: originalname,
        fileName: filename,
        path
    })
    res.status(201).json({
        message: 'File uploaded successfully'
    })

})

app.post('/upload-multiple', upload.array('files', 3), async (req, res) => {
    req.files.forEach(async element => {
        const { originalname, filename, path } = element
        await File.create({
            originalName: originalname,
            fileName: filename,
            path
        })
    });

    res.status(201).json({
        message: 'Files uploaded successfully'
    })
})

app.listen(port, (req, res) => {
    console.log("Server running on port : " + port);
})
