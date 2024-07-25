const mongoose = require('mongoose')
const
const validator = require('validator')

const UserScheme = new mongoose.Schema({
    name: { type: String, required: true},
    email: { type: String, required: true, unique: true, index: true, validate: [validator.isEmail, 'Invalid email']},
    password: { type: String, required: true, minlength: 6}
    })

module.exports = mongoose.model('User', UserScheme)