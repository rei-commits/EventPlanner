const mongoose = require('mongoose')

const EventSchema = new mongoose.Schema({
    title: { type: String, required: true},
    description: { type: String, required: true, minlength: 10 },
    date: { type: Date, required: true, index: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    attendees: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User'}]
    })

module.exports = mongoose.model('Event', EventSchema)