const express = require("express");
const { SchemaType } = require("mongoose");
const {User} = require("../schema/user.schema");

const userRoute = express.Router();

userRoute.get("/:id",async (req,res)=>{
    let users = await User.findOne({_id:req.params.id})
    // let users = await User.findById({});
    console.log(users);
    res.send(users);
    //here
})

userRoute.post("/",async(req,res)=>{
    try{
        // let user = await User.create(req.body);
        const user = new User(req.body)
        await user.save();
        res.send(user);
    }
    catch(err){res.send(err);console.log(err)}
})

userRoute.delete("/:id",async(req,res)=>{
    try{
        await User.deleteOne({_id:req.params.id});
        res.send("Deleted Successfully");
    }catch(err){res.status(401).send(err.message);console.log(err)}
})

module.exports = userRoute;