const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/User');

/**
 * Registers a new user
 */
const registerUser = async (req, res) => {
    const { firstName, lastName, email, password } = req.body;

    if (!firstName || !lastName || !email || !password) {
        return res.status(400).json({ message: 'Missing required fields' });
    }

    const isExisting = Boolean(await User.findOne({ email: email }));
    if (isExisting)
        return res.status(409).json({ message: 'A user already exists under this email' });

    try {
        const salt = await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash(password, salt);

        // create the new user
        const newUser = new User({
            firstName,
            lastName,
            email,
            password: passwordHash
        });

        const rc = await newUser.save();
        const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);

        delete newUser.password;
        return res.status(201).json({ message: rc, token, user: newUser });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

/**
 * Logs in a user
 */
const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email: email }).lean();
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const isMatch = Boolean(await bcrypt.compare(password, user.password));
        if (!isMatch)
            return res.status(400).json({ message: 'Invalid credentials' });

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
        
        delete user.password;
        return res.status(200).json({ token, user });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }   
};

module.exports = {
    registerUser,
    loginUser
};