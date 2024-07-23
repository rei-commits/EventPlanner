const express = require('express')
const User = require('../models/User')
const router = express.Router()

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

//@route POST /api/users
//@desc Register user
router.post('/', async (req, res) => {
    const { name, email, password } = req.body;

    try {
        let user = new User({
            name,
            email,
            password,
        })

        await user.save()
        res.json(user)
    } catch(err) {
        res.status(500).send('Server Error')
    }
})
