const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');

// Middleware to parse JSON bodies
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

const { registerUser, loginUser } = require('../controllers/authController');

const authenticationToken = require('../middlewares/authenticationToken');

router.post('/register', registerUser);
router.post('/login', loginUser);

router.get('/', (req, res) => {
    res.send('Base Route');
});

router.get('/protected', authenticationToken, (req, res) => {
    // the response for this will include the UserID which can be used on the clients database of stored data
    const userData = req.user;
    res.json({ message: 'This is a protected route', user: userData });
});

module.exports = router;