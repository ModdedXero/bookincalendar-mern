const mongoose = require("mongoose");
const Event = require("./event");
const EventType = require("./eventType");

const Schema = mongoose.Schema;

const eventsDataSchema = new Schema({
    events: [Event],
    eventTypes: [EventType]
})

const EventsData = mongoose.model("EventsData", eventsDataSchema);

module.exports = EventsData;