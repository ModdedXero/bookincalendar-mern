const router = require("express").Router();
const mongoose = require("mongoose");
let User = require("../models/user");

router.route("/").get((req, res) => [
    User.find()
        .then(users => res.json(users))
        .catch(err => res.status(400).json(`Error: ${err}`))
])

router.route("/add").post((req, res) => {
    // Take email sent by signup and create a user in Mongo, use firebase-admin to get the UID from the web portal
    User.findOne({"firebaseID": req.body.firebaseID}, (err, user) => {
        if (user) {
            console.log("(DIS) User already exists: " + user.email);
        } else {
            const firebaseID = req.body.firebaseID;
            const email = req.body.email;
        
            const newUser = new User({ firebaseID, email });
        
            newUser.save()
                .then(() => res.json("User Created!"))
                .catch(err => res.status(400).json(`Error: ${err}`))
        }
    })
})

module.exports = router;