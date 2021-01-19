const router = require("express").Router();
const Blog = require("../models/blog");

router.route("/create").post((req, res) => {
    const title = req.body.title;
    const body = req.body.body;
    const coverImage = req.body.coverImage;
    const blogID = req.body.blogID;
    const visible = req.body.visible;

    const newBlog = new Blog({ title, body, coverImage, blogID, visible });
    newBlog.save()
        .then(res.json({ response: "Blog Created!" }))
        .catch(err => console.log(err))
})

router.route("/blogs").get((req, res) => {
    Blog.find()
        .then(doc => res.json({ blogs: doc }))
        .catch(err => res.status(400).json({ response: `Error: ${err}` }))
})

router.route("/:id").get((req, res) => {
    Blog.findById(req.params.id)
        .then(doc => res.json({ postDoc: doc }))
        .catch(err => res.status(400).json({ response: `Error: ${err}`}))
})

router.route("/update/:id").post((req, res) => {
    const blogID = req.params.id;

    Blog.findByIdAndUpdate(blogID, req.body, {
        overwrite: true,
        new: true
    })
    .then(res.json({ response: "Blog Updated!" }))
    .catch(err => res.status(400).json({ response: `Error: ${err}` }))
})

router.route("/delete/:id").delete((req, res) => {
    const blogID = req.params.id;

    Blog.findByIdAndDelete(blogID)
        .then(res.json({ response: "Blog Deleted!" }))
        .catch(err => res.status(400).json({ response: `Error: ${err}` }))
})

module.exports = router;