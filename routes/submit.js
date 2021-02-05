const router = require("express").Router();
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    service: "yahoo",
    auth: {
        user: process.env.SUBMIT_UN,
        pass: process.env.SUBMIT_PW
    }
});

router.route("/blog").post((req, res) => {
    const name = req.body.name;
    const email = req.body.email;
    const business = req.body.business;
    const website = req.body.website;
    const about = req.body.about;

    var mailOptions = {
        from: "boldemotionalcolorful@yahoo.com",
        to: "boldemotionalcolorful@yahoo.com",
        subject: "Blog Submittal",
        text: ` Name: ${name}
        Email: ${email}
        Business: ${business}
        Website: ${website}
        Tell Us About Your Idea:
        ${about}`
    }

    transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
            console.log(err);
        } else {
            res.json({ response: "SUCCESS" })
        }
    })
})

module.exports = router;