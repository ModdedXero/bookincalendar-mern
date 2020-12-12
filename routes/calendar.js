const router = require("express").Router();
const mongoose = require("mongoose");
const User = require("../models/user");
const EventType = require("../models/eventType");

// Event Routes

router.route("/events/:uid").get((req, res) => {
    User.findOne({ "uid": req.params.uid })
        .then(doc => res.send({ events: doc.events }))
        .catch(err => res.status(400).json({ response: `Error: ${err}` }))
})

router.route("/events/:uid/add").post((req, res) => {
        const eventType = req.body.eventType[0]._id;
        const eventStartTime = req.body.eventStartTime;
        const eventEndTime = req.body.eventStartTime;
    
        User.findOneAndUpdate(
            { uid: req.params.uid },
            { $push: { events: { eventType, eventStartTime, eventEndTime } }}
        )
        .then(res.json({ response: "Event Added!"}))
        .catch(err => res.status(400).json({ response: `Error: ${err}` }))
})

router.route("/events/:uid/:eid").delete((req, res) => {
    User.findOneAndUpdate(
        { uid: req.params.uid },
        { $pull: { events: { _id: req.params.eid } }}
    )
    .then(res.json({ response: "Event removed!" }))
    .catch(err => res.status(400).json({ response: `Error: ${err}` }))
})

// Event Type Routes

router.route("/eventtype/:uid/add").post((req, res) => {
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

    User.findOneAndUpdate(
        { uid: req.params.uid },
        { $push: { eventTypes: newEventType }}
    )
    .then(res.json({ response: "Event Type added!" }))
    .catch(err => res.status(400).json({ response: `Error: ${err}` }))
})

router.route("/eventtype/:uid/update").post(async (req, res) => {
    const eventID = req.body.eventID;

    const doc = await User.findOne({ uid: req.params.uid });

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
    User.findOne({ "uid": req.params.uid })
    .then(doc => res.json({ eventTypes: doc.eventTypes }))
    .catch(err => res.status(400).json({ response: `Error: ${err}` }))
})

router.route("/eventtype/:uid/:etid").get((req, res) => {
    User.findOne({ "uid": req.params.uid })
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
    User.findOneAndUpdate(
        { uid: req.params.uid },
        { $pull: { eventTypes: { _id: req.params.etid } }}
    )
    .then(res.json({ response: "Event Type removed!" }))
    .catch(err => res.status(400).json({ response: `Error: ${err}` }))
})

module.exports = router;