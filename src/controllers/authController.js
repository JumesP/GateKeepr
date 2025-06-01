const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const createUserModel = require("../models/userModel");

`
    this controller is responsible for handling the logic of the product routes
    connecting to the database and performing CRUD operations
    crud is an acronym for create, read, update, and delete
`

const registerUser = async (req, res) => {
    try {
        const { username, password, application, userID } = req.body;

        if (!username || !password || !application || !userID) {
            return res.status(400).json({ message: "Please enter all fields" });
        }

        const User = createUserModel(application);

        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password, salt);
        const newUser = new User({ username, password: hashedPassword, userID: userID });
        const savedUser = await newUser.save();

        const token = jwt.sign({ id: savedUser._id }, process.env.JWT_SECRET);
        res.status(201).json({ token, user: { id: savedUser._id, username: savedUser.username, userID: savedUser.userID } });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

//  Login an existing user
const loginUser = async (req, res) => {
    try {
        const { username, password, application } = req.body;

        if (!username || !password || !application) {
            return res.status(400).json({ message: "Please enter all fields" });
        }

        const User = createUserModel(application);

        const user = await User.findOne({ username });
        if (!user) {
            return res.status(400).json({message: "User does not exist"});
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({message: "Invalid credentials"});
        }

        console.log("Database name:", mongoose.connection.name);
        console.log("Collection name:", application + "_User");

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
        res.status(201).json({ token, user: { id: user._id, username: user.username, userID: user.userID } });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { registerUser, loginUser };
