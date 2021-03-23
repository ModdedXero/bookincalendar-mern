const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const messageSchema = new Schema({
    sender: String,
    body: String,
    timeStamp: Date,
    messageType: String
})

const inboxSchema = new Schema({
    messages: [messageSchema]
})

const Inbox = mongoose.model("Inbox", inboxSchema);

module.exports = Inbox;