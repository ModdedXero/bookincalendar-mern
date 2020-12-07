const mongoose = require("mongoose");
const Calendar = require("./calendar");

const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    uid: {
        type: String,
        required: true
    },
    events: [Calendar]
}, {
    timestamps: true
})

const User = mongoose.model("User", userSchema);

module.exports = User;