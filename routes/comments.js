const express = require('express')
const router = express.Router()
const Comment = require('../models/Comment')

// @route GET api/comments
// @desc  get all comments
router.get('/', async (req, res) => {
    try {
        const comments = await Comment.find().populate('createdBy').populate('event')
        res.json(comments)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})
// @route   POST /api/comments
// @desc    Create a comment
router.post('/', async (req, res) => {
    const comment = new Comment({
        text: req.body.text,
        createdBy: req.body.createdBy,
        event: req.body.event
    })

    try {
        const newComment = await comment.save()
        res.status(201).json(newComment)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
})
// @route   DELETE /api/comments/:id
// @desc    Delete a comment
router.delete('/:id', async (req, res) => {
    try {
        const comment = await Comment.findById(req.params.id)
        if (!comment) return res.status(404).json({ message: 'Comment not found' })

        await comment.remove()
        res.json({ message: 'Comment deleted' })
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})
module.exports = router

