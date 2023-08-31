const express = require("express");

const User = require("../schemas/user.schema");

const userRoute = express.Router();
userRoute.use(express.json());

userRoute.get("/",async(req,res)=>{
    const {first_name,last_name} = req.query;
    const users = await User.find({first_name:first_name,last_name:last_name},'_id email');
    res.send(users);

    
}); //query search by name, email, age, gender
userRoute.get("/:id",async(req,res)=>{
    const user = await User.find({_id:req.params.id});
    res.send(user);
}) // particular user
userRoute.post("/login",async(req,res)=>{
    res.send("");
})
userRoute.post("/signup",async(req,res)=>{
    const user = new User(req.body);
    try{
        await user.save();
        res.send(user);
    }catch(err){res.sendStatus(401)}
})   // sign up
userRoute.delete("/:id",async(req,res)=>{
    try {
        await User.findByIdAndDelete(req.params.id);
        res.sendStatus(204);
    }catch(err){console.log(err);res.sendStatus(401)}
})  // close user account
userRoute.patch("/:id",async(req,res)=>{
    try {
        await User.findByIdAndUpdate(req.params.id,req.body);
        res.sendStatus(202);
    }catch(err){console.log(err);res.sendStatus(401)}
})   // change password or edit profile

module.exports = userRoute;