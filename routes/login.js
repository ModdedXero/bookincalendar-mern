const router = require("express").Router();
const User = require("../models/user");

router.route("/signup").post((req, res) => {
        const email = req.body.email;
        const uid = req.body.uid;
        const newUser = new User({ email, uid });

        newUser.save()
            .then(() => res.json({ resposne: "User Created!" }))
            .catch(err => {})
})

module.exports = router;