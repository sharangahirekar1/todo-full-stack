const express = require("express");
const Blog = require("../schemas/blog.schema");

const blogRoute = express.Router();

blogRoute.get("/",async(req,res)=>{
    try {
        const blogs = await Blog.find({});
        res.send({msg:"Getting blogs",data: blogs})
    }catch(err){
        console.log("Error in getting blog",err);
    }
})

blogRoute.post("/", async(req,res)=>{
    try {
        const userId = req.user.id;
        const blogData = {...req.body,author: userId}
        const blog = new Blog(blogData);
        await blog.save();
        res.send({msg:"Saved Successfully"});
    } catch(err){
        console.log("Error in posting blog data", err)
    }
})

module.exports = blogRoute;