const router = require("express").Router();
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

module.exports = router;