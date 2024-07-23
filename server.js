const express = require('express')
const bodyParser = require('body-parser')
const connectDB = require('./config/db')
require('dotenv').config() //This is to load env variables

const app = express()

//connect to database
connectDB()

//Middleware


//Routes