const express = require('express')
const Event = require('../models/Events')
const router = express.Router()

// @route GET api/events
// @desc  get all events
router.get('/', async (req, res) => {
    try {
        const events = await Event.find().populate('user').populate('attendees')
        res.json(events)
    } catch (err) {
        res.status(500).send('Server Error')
    }
})

//@route POST /api/events
//@desc  Create an event
router.post('/', async (req, res) => {
    const { title, description, date, user } = req.body

    try {
        let event = new Event({
            title,
            description,
            date,
            user,
        })

        await event.save()
        res.json(event)
    } catch (err) {
        res.status(500).send('Server Error')
    }
})

// @route   PATCH /api/events/:id
// @desc    Update an event
router.patch('/:id', async (req, res) => {
    const { title, description, date, user, attendees } = req.body;

    try {
        let event = await Event.findById(req.params.id);

        if (event) {
            event.title = title || event.title;
            event.description = description || event.description;
            event.date = date || event.date;
            event.user = user || event.user;
            event.attendees = attendees || event.attendees;

            await event.save();
            res.json(event);
        } else {
            res.status(404).send('Event not found');
        }
    } catch (err) {
        res.status(500).send('Server Error');
    }
});

// @route   DELETE /api/events/:id
// @desc    Delete an event
router.delete('/:id', async (req, res) => {
    try {
        let event = await Event.findById(req.params.id);

        if (event) {
            await event.remove();
            res.json({ msg: 'Event removed' });
        } else {
            res.status(404).send('Event not found');
        }
    } catch (err) {
        res.status(500).send('Server Error');
    }
});

module.exports = router;
