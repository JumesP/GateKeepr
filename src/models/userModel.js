const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const createUserModel = (applicationName) => {
    const modelName = `${applicationName}_User`;

    if (mongoose.models[modelName]) {
        return mongoose.models[modelName];
    }

    const userSchema = new Schema({
        name: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
    }, { timestamps: true });

    return mongoose.model(modelName, userSchema);
};

module.exports = createUserModel;