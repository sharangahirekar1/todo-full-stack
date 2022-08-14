const express = require("express");
const {Blog} = require("../schema/blog.schema");

const blogRoute = express.Router();

blogRoute.get("/:id",async (req,res)=>{
    // let blog = await Blog.findOne({_id:req.params.id})
    // let users = await User.findById({});
    const id = req.params.id;
    let blog = await Blog.find({_id:id}).populate("author")
    console.log(blog);
    res.send(blog);
    
})

blogRoute.get("/",async(req,res)=>{
    let blog = await Blog.find({});
    res.send(blog);
})

blogRoute.post("/",async(req,res)=>{
    try{
        // let blog = await User.create(req.body);  don't use this method - don't know how to make it work
        const blog = new Blog(req.body)
        await blog.save();
        res.send(blog);
    }
    catch(err){res.send(err);console.log(err)}
})

blogRoute.delete("/:id",async(req,res)=>{
    try{
        await Blog.deleteOne({_id:req.params.id});
        res.send("Deleted Successfully");
    }catch(err){res.status(401).send(err.message);console.log(err)}
})

blogRoute.patch("/:id",async(req,res)=>{
    const id = req.params.id;
    try{
        await Blog.findByIdAndUpdate(id,req.body);
        res.sendStatus(202);
    }catch(err){res.status(401).send(err.message);console.log(err)}
})

module.exports = blogRoute;