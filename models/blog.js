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
    blogCategory: {
        type: String,
    },
    featured: {
        type: Boolean,
        default: false
    },
    visible: {
        type: Boolean,
        default: false
    },
    seoTitle: {
        type: String
    },
    seoSlug: {
        type: String,
        unique: true
    },
    seoDescription: {
        type: String
    }
})

const Blog = mongoose.model("Blog", blogSchema);

module.exports = Blog;