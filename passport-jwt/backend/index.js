require('dotenv').config()
const keys = require('./keys')

const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const passport = require('passport')

const app = express()

const port = 8000

app.use(bodyParser.json())
app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: true }))


app.use(passport.initialize())

require('./passport')(passport);

mongoose.set('strictQuery', false)

const User = require('./models/User.model')

// connect to mongodb
const mongouri = `mongodb+srv://admin:${process.env.ATLAS_PASSWORD}@passport-jwt-auth.marjlep.mongodb.net/?retryWrites=true&w=majority`
mongoose.connect(mongouri, { useNewUrlParser: true })
const connection = mongoose.connection

connection.once('open', function() {
    console.log("MongoDB database connection established successfully!");
})


app.get('/', (req, res) => {
    res.status(200).json({
        message: "testing"
    })
})

app.post('/register', async (req, res) => {
    const { username, password } = req.body

    try {
        bcrypt.hash(password, 10, async function(err, hashedPassword) {
            const user = await User.create({
                username: username,
                password: hashedPassword
            })

            res.status(201).json({
                message: 'User created successfully',
                user
            })
        })
    }
    catch(err) {
        console.log(err);
    }
})

app.post('/login', async (req, res) => {
    const { username, password } = req.body

    try {
        let user = await User.findOne({ username: username })
        if(!user) {
            res.status(404).json({
                message: "User not found"
            })
        }

        bcrypt.compare(password, user.password, function(err, result) {
            if(err) {
                res.status(401).json({
                    message: "Login failed please try again"
                })
            }
            if(result) {
                const payload = { id: user.id, username: user.username }

                // sign token
                jwt.sign(
                    payload,
                    'secret',
                    { expiresIn: 30 },
                    (err, token) => {
                        res.json({
                            success: true,
                            token: 'Bearer ' + token
                        })
                    }
                )
            }
            else{
                res.status(401).json({
                    message: "Password doesn't match"
                })
            }
        })
    }
    catch {

    }
})

app.post('/current', passport.authenticate('jwt', { session: false }),async (req, res) => {
    res.json({
        message: 'Success'
    })
})

app.listen(port, (req, res) => {
    console.log("Server running on port : " + port);
})