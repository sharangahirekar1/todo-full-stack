const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({
    title: String,
    author: {type: mongoose.Types.ObjectId, required: true},
    tags: String,
    content: String,
})

const Blog = mongoose.model("blog", blogSchema);

module.exports = Blog;