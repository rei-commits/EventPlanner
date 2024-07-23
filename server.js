const express = require('express')
const bodyParser = require('body-parser')
const connectDB = require('./config/db')
require('dotenv').config() //This is to load env variables

const app = express()

//connect to database
connectDB()

//Middleware
app.use(bodyParser.json())

//Routes
app.use('/api/events', require('./routes/events'))
app.use('/api/users', require('./routes/users'))
app.use('/api/comments', require('/.routes/comments'))

const PORT = process.env.PORT || 3000

app.listen(PORT, () => console.log(`Server started on port ${PORT}`))