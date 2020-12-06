const router = require("express").Router();
const mongoose = require("mongoose");
let User = require("../models/user");
let CalendarEvent = require("../models/calendar");

router.route("/events/:uid").get((req, res) => {
    User.findOne({ "uid": req.params.uid })
        .then(doc => res.json(doc.events))
        .catch(err => res.status(400).json(`Error: ${err}`))
})

router.route("/events/:uid/add").post((req, res) => {
        const eventName = req.body.eventName;
        const eventDate = req.body.eventDate;
    
        User.findOneAndUpdate(
            { uid: req.params.uid },
            { $push: { events: {eventDate, eventName} }}
        )
        .then(doc => res.json(doc))
        .catch(err => console.log(err))
})

module.exports = router;