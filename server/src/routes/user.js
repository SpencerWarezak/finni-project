const express = require('express');
const { registerUser, loginUser } = require('../controllers/user');

const router = express.Router();

// register user
router.post('/register', (req, res) => {
    registerUser(req, res);
});

router.post('/login', (req, res) => {
    loginUser(req, res);
});

module.exports = router;