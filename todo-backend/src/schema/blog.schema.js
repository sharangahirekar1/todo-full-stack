const mongoose = require("mongoose");
//creating a schema
//once
const blogSchema = new mongoose.Schema({
    title:{type:String,required:true},
    content:{type:String,required:true},
    isCompleted:{type:Boolean,required:true},
    author:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user"
    }
},{versionKey:false});
//To use the schema we need model
const Blog = mongoose.model("blog",blogSchema);

module.exports = { Blog};