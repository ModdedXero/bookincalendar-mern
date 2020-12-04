const router = require("express").Router();
const mongoose = require("mongoose");
let User = require("../models/user");

router.route("/").get((req, res) => [
    User.find()
        .then(users => res.json(users))
        .catch(err => res.status(400).json(`Error: ${err}`))
])

router.route("/add").post((req, res) => {
    const id = req.body.id;
    const email = req.body.email;
    const userId = mongoose.Types.ObjectId("id");
    const newUser = new User({email});
    newUser._id = userId;

    newUser.save()
        .then(() => res.json("User Created!"))
        .catch(err => res.status(400).json(`Error: ${err}`))
})

module.exports = router;