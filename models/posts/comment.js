const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const commentSchema = new Schema({
    authorName: String,
    authorEmail: String,
    authorWebsite: String,
    isApproved: {
        type: Boolean,
        default: false
    },
    createdDate: Date
})

const Comment = mongoose.model("Comment", commentSchema);

module.exports = Comment;