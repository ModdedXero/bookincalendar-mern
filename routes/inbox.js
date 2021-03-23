const router = require("express").Router();
const Inbox = require("../models/inbox");
const User = require("../models/user");

router.route("/:id").get((req, res) => {
    Inbox.findById(req.params.id)
        .then(doc => res.json({ response: doc }))
})

router.route("/send/:id").post(async (req, res) => {
    const user = await User.findById(req.params.id);
    const inbox = await Inbox.findById(user.inboxID);

    inbox.update({
        $push: { messages: req.body.message }
    })
})

router.route("/sendall").post(async (req, res) => {
    const user = await User.find();

    user.map(async (user) => {
        const inbox = await Inbox.findById(user.inboxID);

        inbox.update({
            $push: { messages: req.body.message }
        })
    })
})

module.exports = router;