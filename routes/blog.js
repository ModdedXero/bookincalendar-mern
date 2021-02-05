const router = require("express").Router();
const Blog = require("../models/posts/blog");
const CommentContainer = require("../models/posts/commentContainer");

/* Blog Post Routes */

router.route("/create").post((req, res) => {
    const title = req.body.title;
    const body = req.body.body;
    const coverImage = req.body.coverImage;
    const blogID = req.body.blogID;
    const blogCategory = req.body.blogCategory;
    const featured = req.body.featured;
    const visible = req.body.visible;
    const seoTitle = req.body.seoTitle;
    const slug = req.body.slug;
    const seoDescription = req.body.seoDescription;

    const newCommentContainer = new CommentContainer();

    const commentsID = newCommentContainer._id;

    const newBlog = new Blog({ 
        title, 
        body, 
        coverImage, 
        blogID, 
        blogCategory,
        featured,
        visible,
        seoTitle,
        slug,
        seoDescription,
        commentsID
    });

    newBlog.save()
        .then(res.json({ response: "Blog Created!" }))
        .catch(err => console.log(err))
    newCommentContainer.save()
        .then()
        .catch(() => {})
})

router.route("/blogs").get((req, res) => {
    Blog.find()
        .then(doc => res.json({ blogs: doc }))
        .catch(err => res.status(400).json({ response: `Error: ${err}` }))
})

router.route("/blogs/featured").get((req, res) => {
    Blog.find({ featured: true, visible: true })
        .then(doc => res.json({ blogs: doc }))
        .catch(err => res.status(400).json({ response: `Error: ${err}` }))
})

router.route("/blogs/category/:category").get((req, res) => {
    Blog.find({ blogCategory: req.params.category })
        .then(doc => res.json({ blogs: doc }))
        .catch(err => res.status(400).json({ response: `Error: ${err}` }))
})

router.route("/:id").get((req, res) => {
    Blog.findById(req.params.id)
        .then(doc => res.json({ postDoc: doc }))
        .catch(err => res.status(400).json({ response: `Error: ${err}`}))
})

router.route("/public/:slug").get((req, res) => {
    Blog.findOne({ slug: req.params.slug })
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

/* Comment Routes */

router.route("/comments/count/:id").get(async (req, res) => {
    var commentCount = 0;
    const doc = await CommentContainer.findById(req.params.id).catch(() => {})

    if (doc != undefined) {
        doc.comments.map((comment) => {
            if (!comment.isApproved) {
                commentCount++;
            }

            comment.subComments.map((sub) => {
                if (!sub.isApproved) {
                    commentCount++;
                }
            })
        })
    }

    res.json({ response: commentCount });
})

router.route("/comments/:id").get((req, res) => {
    CommentContainer.findById(req.params.id)
        .then(doc => res.json({ response: doc }))
        .catch(err => res.status(400).json({ response: `Error: ${err}` }))
})

router.route("/comment/add/:id").post((req, res) => {
    const newComment = {
        authorName: req.body.name,
        authorEmail: req.body.email,
        authorWebsite: req.body.website,
        commentBody: req.body.commentBody,
        isApproved: false,
        createdDate: new Date()
    }
    
    CommentContainer.findByIdAndUpdate(req.params.id, {
        $push: { comments: newComment }
    })
    .then(() => res.json({ response: "SUCCESS" }))
})

router.route("/comment/sub/add/:id").post(async (req, res) => {
    const commentID = req.body.commentID;

    const newSubComment = {
        authorName: req.body.name,
        authorEmail: req.body.email,
        authorWebsite: req.body.website,
        commentBody: req.body.commentBody,
        isApproved: false,
        createdDate: new Date()
    }

    const doc = await CommentContainer.findById(req.params.id);

    doc.comments.map((comment, index) => {
        if (comment._id == commentID) {
            doc.comments[index].subComments.push(newSubComment);
        }
    })

    doc.save()
        .then(() => res.json({ response: "SUCCESS" }))
})

router.route("/comment/delete/:id/:commentId").delete((req, res) => {
    const commentID = req.params.commentId;

    CommentContainer.findByIdAndUpdate(req.params.id, {
        $pull: { comments: { _id: commentID } }
    })
    .then(() => res.json({ response: "SUCCESS" }))
})

router.route("/comment/sub/delete/:id/:commentId/:subComId").delete(async (req, res) => {
    const commentId = req.params.commentId;
    const subComId = req.params.subComId;

    const doc = await CommentContainer.findById(req.params.id);

    doc.comments.map((comment, i) => {
        if (comment._id == commentId) {
            comment.subComments.map((subCom, j) => {
                if (subCom._id == subComId) {
                    doc.comments[i].subComments.splice(j, 1);
                }
            })
        }
    })

    doc.save()
        .then(() => res.json({ response: "SUCCESS" }))
})

router.route("/comment/approve/:id").post(async (req, res) => {
    const doc = await CommentContainer.findById(req.params.id);

    doc.comments.map((comment, index) => {
        if (comment._id == req.body.commentID) {
            doc.comments[index].isApproved = true;
        }
    })

    doc.save()
        .then(() => res.json({ response: "SUCCESS" }))
})

router.route("/comment/sub/approve/:id").post(async (req, res) => {
    const doc = await CommentContainer.findById(req.params.id);

    doc.comments.map((comment, i) => {
        if (comment._id == req.body.commentID) {
            comment.subComments.map((subCom, j) => {
                if (subCom._id == req.body.subComID) {
                    doc.comments[i].subComments[j].isApproved = true;
                }
            })
        }
    })

    doc.save()
        .then(() => res.json({ response: "SUCCESS" }))
})

module.exports = router;