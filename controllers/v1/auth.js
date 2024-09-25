const asynchandler = require('express-async-handler');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../../models/User');


const login = asynchandler(async (req, res) => {
    const { email, password } = req.body;

    if (!email ||!password) {
        res.status(400).json({ error: 'Please provide email and password' });
        return;
    }

    const user = await User.findOne({ email })
        .catch((err) => {
            console.error(err);
            res.status(500).json({ error: 'Internal error' });
        });

    const comparePassword = await bcrypt.compare(password, user.password);
    if (!comparePassword) {
        res.status(401).json({ error: 'Invalid credentials' });
        return;
    }

    const token = jwt.sign({ id: user._id, username: user.username }, process.env.JWT_SECRET, { expiresIn: '30d' });
    res.status(200).json({ token });
});

module.exports = { login};