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
        required: true,
    },
    profileName: {
        type: String,
        default: ""
    },
    profilePicture: {
        type: String,
        default: ""
    },
    profileTags: [String],
    profileAuthority: Number,
    profileCreatedDate: {
        type: Date,
        default: new Date()
    },
    inboxID: String
})

const User = mongoose.model("User", userSchema);

module.exports = User;