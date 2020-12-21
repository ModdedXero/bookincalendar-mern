const mongoose = require("mongoose");

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
    eventsID: {
        type: String,
        required: true
    },
    clientsID: {
        type: String,
        required: true
    },
    isTrial: {
        type: Boolean,
        default: true
    },
    expirationDate: {
        type: Date,
        required: true
    }
})

const User = mongoose.model("User", userSchema);

module.exports = User;