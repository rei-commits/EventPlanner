const express = require('express')
const router = express.Router()
const Event = require('../models/Event')

// @route GET api/events
// @desc  get all events
router.get('/', async (req, res) => {
    try {
        const events = await Event.find().populate('createdBy').populate('comments')
        res.json(events)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

//@route POST /api/events
//@desc  Create an event
router.post('/', async (req, res) => {
    const event = new Event({
        title: req.body.title,
        description: req.body.description,
        date: req.body.date,
        createdBy: req.body.createdBy
    })

    try {
        const newEvent = await event.save()
        res.status(201).json(newEvent)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
})

// @route   PATCH /api/events/:id
// @desc    Update an event
router.patch('/:id', async (req, res) => {
    try {
        const event = await Event.findById(req.params.id)
        if (!event) return res.status(404).json({ message: 'Event not found' })

        if (req.body.title != null) event.title = req.body.title
        if (req.body.description != null) event.description = req.body.description
        if (req.body.date != null) event.date = req.body.date

        const updatedEvent = await event.save()
        res.json(updatedEvent)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
})

// @route   DELETE /api/events/:id
// @desc    Delete an event
router.delete('/:id', async (req, res) => {
    try {
        let event = await Event.findById(req.params.id)
        if (!event) return res.status(404).json({ message: 'Event not found' })
        await event.remove()
        res.json({ msg: 'Event removed' })
    } catch (err) {
        res.status(500).send('Server Error')
    }
})

module.exports = router
