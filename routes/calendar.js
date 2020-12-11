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
        const eventName = req.body.eventName;
        const eventDate = req.body.eventDate;
    
        User.findOneAndUpdate(
            { uid: req.params.uid },
            { $push: { events: {eventDate, eventName} }}
        )
        .then(doc => res.json({ response: doc }))
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
    const description = req.body.description;
    const image = req.body.image;

    const newEventType = {
        eventName,
        color,
        description,
        image
    }

    User.findOneAndUpdate(
        { uid: req.params.uid },
        { $push: { eventTypes: newEventType }}
    )
    .then(res.json({ response: "Event Type added!" }))
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
        { $pull: { events: { _id: req.params.etid } }}
    )
    .then(res.json({ response: "Event Type removed!" }))
    .catch(err => res.status(400).json({ response: `Error: ${err}` }))
})

module.exports = router;