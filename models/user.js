const mongoose = require("mongoose");
const Event = require("./event");
const EventType = require("./eventType");

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
    events: [Event],
    eventTypes: [EventType],
    isTrial: {
        type: Boolean,
        default: true
    },
    expirationDate: Date
})

const User = mongoose.model("User", userSchema);

module.exports = User;