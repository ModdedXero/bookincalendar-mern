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
    const gallery = req.body.gallery;
    const article = req.body.article;
    const about = req.body.about;

    var mailOptions = {
        from: "boldemotionalcolorful@yahoo.com",
        to: "boldemotionalcolorful@yahoo.com",
        subject: "Blog Submittal",
        text: ` Name: ${name}
        Email: ${email}
        Business: ${business}
        Website: ${website}
        Link to Gallery: ${gallery}
        Link to Article: ${article}
        Tell Us About the Session or Article:
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