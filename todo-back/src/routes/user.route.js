const express = require("express");
const userControls = require("./../controllers/users");
const jwt = require("jsonwebtoken");

const User = require("../schemas/user.schema");

const token_Secret = process.env.jwt_token_secret;
const refresh_token_secret = process.env.jwt_refresh_token_secret ;

const userRoute = express.Router();
userRoute.use(express.json());


userRoute.get("/refresh", async (req,res)=>{
    const refreshToken = req.headers["authorization"].split(" ")[1];
    console.log(refresh_token_secret,'refresh secret');
    const valid = jwt.verify(refreshToken, refresh_token_secret);
    if(valid) {
        const decode = jwt.decode(refreshToken, {complete: true})
        const token = jwt.sign(decode, token_Secret, {expiresIn: "1 hour"})
        res.send({msg: "Primary token", token})
    }
})

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
    try{
        await userControls.login(req,res);

    }
    catch(err){
        console.log(err, 'login error');
        // res.sendStatus(401)
    }
})

userRoute.post("/forgotPassword", async(req,res)=>{
    try {
        await userControls.forgotPassword(req,res);
    }
    catch(err){
        console.log(err,"forgotpassword error");
    }

})

userRoute.post("/signup",async(req,res)=>{
    try{
        await userControls.signup(req,res);
    }catch(err){
        console.log(err,'error ');
        // res.sendStatus(401);
    }
})   // sign up
userRoute.delete("/:id",async(req,res)=>{
    try {
        await User.findByIdAndDelete(req.params.id);
        res.sendStatus(204);
    }catch(err){console.log(err)}
})  // close user account
userRoute.patch("/:id",async(req,res)=>{
    try {
        await User.findByIdAndUpdate(req.params.id,req.body);
        res.sendStatus(202);
    }catch(err){console.log(err);}
})   // change password or edit profile


module.exports = userRoute;