const router = require("express").Router();
const request = require("superagent");
const firebase = require("firebase");
const nodemailer = require("nodemailer");

const User = require("../models/user");


const transporter = nodemailer.createTransport({
    service: "yahoo",
    auth: {
        user: process.env.SUBMIT_UN,
        pass: process.env.SUBMIT_PW
    }
});

router.route("/signup").post(async (req, res) => {
    const email = req.body.email;
    const profileName = req.body.username;
    const profileAuthority = req.body.profileAuthority;
    const tempPassword = req.body.tempPassword;

    User.findOne({ "email": email })
        .then(alreadyExists = true)
        .catch(alreadyExists = false)

    if (!alreadyExists) {
        var uid;
        await firebase.auth().createUserWithEmailAndPassword(email, tempPassword)
        .then(usr => {
            uid = usr.user.uid;
            
            const newUser = new User({ email, uid, profileName, profileAuthority });
            
            newUser.save();
            
            var mailOptions = {
                from: "boldemotionalcolorful@yahoo.com",
                to: email,
                subject: "BEC Creator Login",
                text: `Goto xxx.com and enter ${tempPassword} for the password`
            }
            
            transporter.sendMail(mailOptions);
        })
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

router.route("/users").get((req, res) => {
    User.find()
        .then(doc => res.json({ response: doc }))
})

router.route("/:id").get((req, res) => {
    const uid = req.params.id;

    User.findOne({ "uid": uid })
        .then(doc => res.json({ response: doc }))
        .catch(err => res.status(400).json({ response: "User not found!" }))
})

router.route("/update").post((req, res) => {
    User.findOneAndUpdate({ "uid": req.body.profileUpdate.uid }, req.body.profileUpdate, { new: true })
        .then(doc => res.json({ response: "Success!" }))

})

module.exports = router;