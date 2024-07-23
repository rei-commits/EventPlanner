const mongoose =require('mongoose')

const CommentSchema = new mongoose.Schema({
    text: { type: String, required: true},
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    event: { type: mongoose.Schema.Types.ObjectId, ref: 'Event'},
})

module.exports = mongoose.model('Comment', CommentSchema)
