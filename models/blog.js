const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const blogSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    },
    coverImage: {
        type: String,
        required: true
    },
    blogID: {
        type: String,
        required: true
    },
    visible: {
        type: Boolean,
        default: false
    }
})

const Blog = mongoose.model("Blog", blogSchema);

module.exports = Blog;