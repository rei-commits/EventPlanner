const mongoose =require('mongoose')

const CommentSchema = new mongoose.Schema({
    text: { type: String, required: true, minlength: 5 },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    event: { type: mongoose.Schema.Types.ObjectId, ref: 'Event', required: true},
})

module.exports = mongoose.model('Comment', CommentSchema)
