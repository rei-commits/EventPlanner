const express = require('express')
const router = express.Router()
const User = require('../models/User')

// @route GET api/users
// @desc  get all users

router.get('/', async (req, res) => {
    try {
        const users = await User.find()
        res.json(users)
    } catch (err) {
        res.status(500).send('Server Error')

    }
})

// PATCH update a user
router.patch('/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) return res.status(404).json({ message: 'User not found' });

        if (req.body.name != null) user.name = req.body.name;
        if (req.body.email != null) user.email = req.body.email;
        if (req.body.password != null) user.password = req.body.password;

        const updatedUser = await user.save();
        res.json(updatedUser);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// DELETE a user
router.delete('/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) return res.status(404).json({ message: 'User not found' })

            await user.remove()
            res.json({ message: 'User deleted' })
            } catch (err) {
                res.status(500).json({ message: err.message })
            }
        })
        module.exports = router