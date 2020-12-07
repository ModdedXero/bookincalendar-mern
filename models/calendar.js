const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const calendarSchema = new Schema({
    eventName: {
        type: String,
        required: true
    },
    eventDate: {
        type: Date,
        required: true
    }
})

module.exports = calendarSchema;