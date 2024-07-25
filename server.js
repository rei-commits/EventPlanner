const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
require('dotenv').config() //This is to load env variables

const app = express()

//Middleware
app.use(bodyParser.json())

// Database connection
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => console.log('MongoDB connected'))
.catch(err => console.log(err));

//Routes
const users = require('./routes/users')
const events = require('./routes/events')
const comments = require('./routes/comments')

app.use('/api/events', require('./routes/events'))
app.use('/api/users', require('./routes/users'))
app.use('/api/comments', require('/.routes/comments'))

const PORT = process.env.PORT || 3000
app.listen(PORT, () => console.log(`Server started on port ${PORT}`))