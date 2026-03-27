const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth'); // Assuming auth middleware exists
const { register, login, verify } = require('../controllers/auth'); // Add verify

// @route   POST api/auth/register
// @desc    Register user
// @access  Public
router.post('/register', register);

// @route   POST api/auth/login
// @desc    Authenticate user & get token
// @access  Public
router.post('/login', login);

// @route   GET api/auth/verify
// @desc    Verify token & get user data
// @access  Private
router.get('/verify', auth, verify);

module.exports = router;
