const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const eventSchema = new Schema({
    eventType: {
        type: String,
        required: true
    },
    eventStartTime: {
        type: Date,
        required: true
    },
    eventEndTime: {
        type: Date,
        required: true
    },
    isBooked: false
})

module.exports = eventSchema;