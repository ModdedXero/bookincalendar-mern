const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const colorValidator = (v) => (/^#([0-9a-f]{3}){1,2}$/i).test(v);

const eventTypeSchema = new Schema({
    eventName: {
        type: String,
        required: true
    },
    color: {
        type: String,
        validate: [colorValidator, "Invalid Color"],
        required: true
    },
    backgroundColor: {
        type: String,
    },
    description: {
        type: String,
        required: true
    }
})

module.exports = eventTypeSchema;