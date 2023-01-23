// API to login user & authentication

const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs/dist/bcrypt');
const jwt = require('jsonwebtoken');
const config = require('config');
const auth = require('../middleware/auth');
const { check, validationResult } = require('express-validator');

const User = require('../models/User');

// @route           GET api/auth
// @description     Get logged in user
// @access          Private
router.get('/', auth, async (req, res) => { // this is a private path, so need to protect it via auth middleware passed as second argument
    try {
        // Get the user from the DB
        const user = await User.findById(req.user.id).select('-password'); // the 'req' object has user object attached to it {from auth.js middleware file} which contains userID
        res.json({ user });

    } catch (error) {
        console.error(error.message);
        res.status(500).send('Internal Server Error');
    }
});

// @route           POST api/auth
// @description     Auth user & get token
// @access          Public
router.post('/', [
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password is required').exists()
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }

    const { email, password } = req.body;

    try {
        let user = await User.findOne({ email });
        if (!user)
            return res.status(400).json({ msg: 'Invalid Credentials' });

        const isPasswordMatch = await bcrypt.compare(password, user.password);

        if (!isPasswordMatch)
            return res.status(400).json({ msg: 'Invalid Credentials' });

        const payload = {
            user: {
                id: user.id
            }
        }

        jwt.sign(payload, config.get('jwtSecret'), {
            expiresIn: 360000
        }, (err, token) => {
            if (err) throw err;
            res.json({ token })
        });
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;