const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const createUserModel = (applicationName) => {
    const modelName = `${applicationName}_User`;

    if (mongoose.models[modelName]) {
        return mongoose.models[modelName];
    }

    const userSchema = new Schema({
        username: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        userID: { type: String, required: true },
    }, { timestamps: true });

    return mongoose.model(modelName, userSchema);
};

const queryUserModel = async (applicationName, query) => {
    const User = createUserModel(applicationName);
    if (!User) {
        throw new Error(`Model for application '${applicationName}' could not be created.`);
    }
    return await User.find(query).exec();
};

const findUserById = async (applicationName, userId) => {
    const User = createUserModel(applicationName);
    if (!User) {
        throw new Error(`Model for application '${applicationName}' could not be created.`);
    }
    return await User.findById(userId).exec();
};

const findUserByUsername = async (applicationName, username) => {
    const User = createUserModel(applicationName);
    if (!User) {
        throw new Error(`Model for application '${applicationName}' could not be created.`);
    }
    return await User.findOne({ username }).exec();
};

const createNewUser = async (applicationName, userData) => {
    const User = createUserModel(applicationName);
    if (!User) {
        throw new Error(`Model for application '${applicationName}' could not be created.`);
    }
    const newUser = new User(userData);
    return await newUser.save();
};

const updateUser = async (applicationName, query, updateData) => {
    const User = createUserModel(applicationName);
    if (!User) {
        throw new Error(`Model for application '${applicationName}' could not be created.`);
    }
    return await User.updateOne(query, updateData).exec();
};

const deleteUser = async (applicationName, query) => {
    const User = createUserModel(applicationName);
    if (!User) {
        throw new Error(`Model for application '${applicationName}' could not be created.`);
    }
    return await User.deleteOne(query).exec();
};

module.exports = { createUserModel, queryUserModel, findUserById, findUserByUsername, createNewUser, updateUser, deleteUser };
