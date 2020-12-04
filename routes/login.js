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
        const email = req.body.email;
    
        const newUser = new User({ email });
    
        newUser.save()
            .then(() => res.json("User Created!"))
            .catch(err => res.status(400).json(`Error: ${err}`))
})

module.exports = router;