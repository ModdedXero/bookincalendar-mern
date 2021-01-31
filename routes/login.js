const router = require("express").Router();
const request = require("superagent");

const User = require("../models/user");
const EventsData = require("../models/eventsData");
const ClientsData = require("../models/clientsData");

router.route("/signup").post((req, res) => {
    const email = req.body.email;
    const uid = req.body.uid;

    User.findOne({ "uid": uid })
        .then(alreadyExists = true)
        .catch(alreadyExists = false)

    if (!alreadyExists) {
        const eventsData = new EventsData();
        const clientsData = new ClientsData();
        const eventsID = eventsData._id;
        const clientsID = clientsData._id;
        
        const newUser = new User({ email, uid, eventsID, clientsID });

        newUser.save()
            .then(res.json({ response: "User Created!" }))
            .catch(err => {})

        eventsData.save()
            .then()
            .catch(err => {})
            
        clientsData.save()
            .then()
            .catch(err => {})
    }
})

router.route("/newsletter").post((req, res) => {
    request
        .post(`https://${process.env.MAILCHIMP_INSTANCE}.api.mailchimp.com/3.0/lists/${process.env.MAILCHIMP_LISTID}/members/`)
        .set("Content-Type", "application/json;charset=utf-8")
        .set("Authorization", "Basic " + Buffer.from("anystring:" + process.env.MAILCHIMP_APIKEY).toString("base64"))
        .send({
            "email_address": req.body.email,
            "status": "subscribed",
            "merge_fields": {
                "FNAME": req.body.firstName,
                "LNAME": req.body.lastName
            }
        })
        .end((err, response) => {
            if (response.status < 300 || (response.status === 400 && response.body.title === "Member Exists")) {
                res.json({ response: "SUCCESS" });
            } else {
                res.json({ response: "FAILURE" });
            }
        })
})

module.exports = router;