const User = require('../models/User');
const bcrypt = require('bcrypt');


exports.signup = async (req, res) => {
    const { username, password } = req.body;

    try {
     
        let user = await User.findOne({ username });
        if (user) {
            return res.status(400).json({ msg: 'User already exists' });
        }

        user = new User({
            username,
            password
        });

        await user.save();

        res.json({ msg: 'User created successfully' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

exports.signin = async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await User.findOne({ username });

        if (!user) {
            return res.status(400).json({ msg: 'no user' });
        }

        if (password !== user.password) {
            return res.status(400).json({ msg: 'Invalid username or password' });
        }

        res.json({ msg: 'Sign in successful' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};