const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    first_name:{type:String,required:true},
    last_name:{type:String,required:true},
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true},// want a password validator here
    age:{type:Number,required:true},
    gender:{type:String,enum:["Male","Female"]}
})

const User = mongoose.model("user",userSchema);

module.exports = User;