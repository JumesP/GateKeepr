const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');

// Middleware to parse JSON bodies
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

const { registerUser, loginUser } = require('../controllers/authController');

const authenticationToken = require('../middlewares/authenticationToken');
const { findUserById } = require('../models/userModel');

router.post('/register', registerUser);
router.post('/login', loginUser);

router.get('/', (req, res) => {
    res.send('Base Route');
});

router.get('/protected', authenticationToken, async (req, res) => {
    // Query the database for the user based on the user ID from the token
    // Query the database for the user based on the user ID from the token using the User schema
    console.log(req.user.id);
    const userId = req.user && (req.user.id || req.user._id);

    console.log("User ID from token:", userId);

    try {
        const user = await findUserById('TrainEvoo', userId);
        console.log("User model:", user);
        console.log("User id:", user.userID);
        res.json({message: 'This is a protected route', userID: user ? user.userID : null});
    } catch (error) {
        res.status(500).json({error: 'Failed to fetch user data'});
    }
});

module.exports = router;