const router = require("express").Router();
const mongoose = require("mongoose");
const User = require("../models/user");
const EventsData = require("../models/eventsData");

// Event Routes

router.route("/events/:uid").get((req, res) => {
    var eventsID;

    User.findOne({ "uid": req.params.uid })
        .then(doc => eventsID = doc.eventsID)
        .catch(err => {})

    EventsData.findOne({ "uid": eventsID })
        .then(doc => res.json({ events: doc.events }))
        .catch(err => res.status(400).json({ response: `Error: ${err}` }))
})

router.route("/events/:uid/add").post((req, res) => {
        var eventsID;

        const eventType = req.body.eventType[0]._id;
        const eventStartTime = req.body.eventStartTime;
        const eventEndTime = req.body.eventEndTime;

        User.findOne({ "uid": req.params.uid })
            .then(doc => eventsID = doc.eventsID)
            .catch(err => {})
    
        EventsData.findOneAndUpdate(
            { uid: eventsID },
            { $push: { events: { eventType, eventStartTime, eventEndTime } }}
        )
        .then(res.json({ response: "Event Added!"}))
        .catch(err => res.status(400).json({ response: `Error: ${err}` }))
})

router.route("/events/:uid/:eid").delete((req, res) => {
    var eventsID;

    User.findOne({ "uid": req.params.uid })
        .then(doc => eventsID = doc.eventsID)
        .catch(err => {})

    EventsData.findOneAndUpdate(
        { uid: eventsID },
        { $pull: { events: { _id: req.params.eid } }}
    )
    .then(res.json({ response: "Event removed!" }))
    .catch(err => res.status(400).json({ response: `Error: ${err}` }))
})

// Event Type Routes

router.route("/eventtype/:uid/add").post((req, res) => {
    var eventsID;
    
    const eventName = req.body.eventName;
    const color = req.body.color;
    const backgroundColor = req.body.backgroundColor;
    const description = req.body.description;

    const newEventType = {
        eventName,
        color,
        backgroundColor,
        description
    }

    User.findOne({ "uid": req.params.uid })
        .then(doc => eventsID = doc.eventsID)
        .catch(err => {})

    EventsData.findOneAndUpdate(
        { uid: eventsID },
        { $push: { eventTypes: newEventType }}
    )
    .then(res.json({ response: "Event Type added!" }))
    .catch(err => res.status(400).json({ response: `Error: ${err}` }))
})

router.route("/eventtype/:uid/update").post(async (req, res) => {
    var eventsID;

    const eventID = req.body.eventID;

    User.findOne({ "uid": req.params.uid })
        .then(usr => eventsID = usr.eventsID)
        .catch(err => {})

    const doc = await EventsData.findOne({ uid: eventsID });

    doc.eventTypes.map((type, index) => {
        if (type._id == eventID) {
            doc.eventTypes[index].eventName = req.body.eventName;
            doc.eventTypes[index].color = req.body.color;
            doc.eventTypes[index].backgroundColor = req.body.backgroundColor;
            doc.eventTypes[index].description = req.body.description;
        }
    })
    
    await doc.save()
        .then(res.json({ response: "Event Type updated!" }))
        .catch(err => res.status(400).json({ response: `Error: ${err}` }))
})

router.route("/eventtype/:uid").get((req, res) => {
    var eventsID;

    User.findOne({ "uid": req.params.uid })
        .then(doc => eventsID = doc.eventsID)
        .catch(err => {})

    EventsData.findOne({ "uid": eventsID })
        .then(doc => res.json({ eventTypes: doc.eventTypes }))
        .catch(err => res.status(400).json({ response: `Error: ${err}` }))
})

router.route("/eventtype/:uid/:etid").get((req, res) => {
    var eventsID;

    User.findOne({ "uid": req.params.uid })
        .then(doc => eventsID = doc.eventsID)
        .catch(err => {})

    EventsData.findOne({ "uid": eventsID })
        .then(doc => {
            for (const eType in doc.eventTypes) {
                if (eType._id === eq.params.etid) {
                    res.json({ eventType: eType });
                    return;
                }
            }

            res.json({ response: "No Event Type found." })
        })
        .catch(err => res.status(400).json({ response: `Error: ${err}` }))
})

router.route("/eventtype/:uid/:etid").delete((req, res) => {
    var eventsID;

    User.findOne({ "uid": req.params.uid })
        .then(doc => eventsID = doc.eventsID)
        .catch(err => {})

    EventsData.findOneAndUpdate(
        { uid: eventsID },
        { $pull: { eventTypes: { _id: req.params.etid } }}
    )
    .then(res.json({ response: "Event Type removed!" }))
    .catch(err => res.status(400).json({ response: `Error: ${err}` }))
})

module.exports = router;