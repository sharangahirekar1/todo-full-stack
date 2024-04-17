const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username:{type:String,required:true},
    email:{type:String,required:true,unique:true},
    hash:{type:String},// want a password validator here
})

const User = mongoose.model("user",userSchema);

module.exports = User;