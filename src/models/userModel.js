const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");

const userSchema = new Schema({
    name: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
}, { timestamps: true });

// userSchema.pre("save", async function (next) {
//     const user = this;
//     if (user.isModified("password")) {
//         user.password = await bcrypt.hash(user.password, 8);
//     }
//     next();
// });
//
// userSchema.methods.comparePassword = async function (password) {
//     const user = this;
//     return await bcrypt.compare(password, user.password);
// }

const User = mongoose.model("User", userSchema);

module.exports = User;
