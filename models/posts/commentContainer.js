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
    createdDate: Date,
    subComments: [{
        authorName: String,
        authorEmail: String,
        authorWebsite: String,
        isApproved: {
            type: Boolean,
            default: false
        },
        createdDate: Date
    }]
})

const commentContainerSchema = new Schema({
    comments: [commentSchema]
})

const CommentContainer = mongoose.model("CommentContainer", commentContainerSchema);

module.exports = CommentContainer;