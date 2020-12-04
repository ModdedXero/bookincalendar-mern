const mongoose = require("mongoose");
const shortid = require("shortid");

const Schema = mongoose.Schema;

const userSchema = new Schema({
    firebaseID: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    }
}, {
    timestamps: true
})

const User = mongoose.model("User", userSchema);

module.exports = User;