const router = require("express").Router();
const mongoose = require("mongoose");
let User = require("../models/user");

router.route("/events/:uid").get((req, res) => {
    User.findOne({ "uid": req.params.uid })
        .then(doc => res.send({ events: doc.events }))
        .catch(err => res.status(400).json(`Error: ${err}`))
})

router.route("/events/:uid/add").post((req, res) => {
        const eventName = req.body.eventName;
        const eventDate = req.body.eventDate;
    
        User.findOneAndUpdate(
            { uid: req.params.uid },
            { $push: { events: {eventDate, eventName} }}
        )
        .then(doc => res.json({ response: doc }))
        .catch(err => console.log(err))
})

router.route("/events/:uid/:eid").delete((req, res) => {
    User.findOneAndUpdate(
        { uid: req.params.uid },
        { $pull: { events: { _id: req.params.eid } }}
    )
    .then(doc => res.json({ response: doc }))
    .catch(err => console.log(err))
})

module.exports = router;