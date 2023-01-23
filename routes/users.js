// API to register a user

const bcrypt = require('bcryptjs/dist/bcrypt');
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator');

const User = require('../models/User');

// @route           POST api/users
// @description     Register a user
// @access          Public
router.post('/', [
    check('name', 'Please add a name').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Please enter a password with 6 or more characters').isLength({ min: 6 })
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ erros: errors.array() });
    }
    const { name, email, password } = req.body;

    try {
        let user = await User.findOne({ email: email });

        if (user)
            return res.status(400).json({ msg: 'User already exists' });

        user = new User({
            name: name, // can be written as 'name' only since property and value have same name.
            email,
            password
        });

        // Password hashing 
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);

        // Save user to DB
        await user.save();

        // Send JWT to user
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