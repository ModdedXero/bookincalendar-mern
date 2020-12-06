const router = require("express").Router();
const User = require("../models/user");

router.route("/").get((req, res) => [
    User.find()
        .then(users => res.json(users))
        .catch(err => res.status(400).json(`Error: ${err}`))
])

router.route("/signup").post((req, res) => {
        const email = req.body.email;
        const uid = req.body.uid;
        const newUser = new User({ email, uid });

        newUser.save()
            .then(() => res.json("User Created!"))
            .catch((err) => {})
})

module.exports = router;