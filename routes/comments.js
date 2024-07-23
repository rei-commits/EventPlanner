const express = require('express')
const Comment = require('../models/Comment')
const router = express.Router()

// @route GET api/comments
// @desc  get all comments
router.get('/', async (req, res) => {
    try {
        const comments = await Comment.find().populate('user').populate('event')
        res.json(comments)
    } catch (err) {
        res.status(500).send('Server Error')
    }
})


// @route   POST /api/comments
// @desc    Create a comment
router.post('/', async (req, res) => {
    const { text, user, event } = req.body

    try {
        let comment = new Comment({
            text,
            user,
            event
        })

        await comment.save()
        res.json(comment)
    } catch (err) {
        res.status(500).send('Server Error')
    }
})

// @route   PATCH /api/comments/:id
// @desc    Update a comment
router.patch('/:id', async (req, res) => {
    const { text } = req.body

    try {
        let comment = await Comment.findById(req.params.id)

        if (comment) {
            comment.text = text || comment.text
            await comment.save()
            res.json(comment)
        } else {
            res.status(404).send('Comment not found')
        }
    } catch (err) {
        res.status(500).send('Server Error')
    }
})

// @route   DELETE /api/comments/:id
// @desc    Delete a comment
router.delete('/:id', async (req, res) => {
    try {
        let comment = await Comment.findById(req.params.id)

        if (comment) {
            await comment.remove()
            res.json({ msg: 'Comment removed' })
        } else {
            res.status(404).send('Comment not found')
        }
    } catch (err) {
        res.status(500).send('Server Error')
        }
    })

module.exports = router

