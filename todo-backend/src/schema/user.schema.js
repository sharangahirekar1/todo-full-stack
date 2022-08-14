const mongoose = require("mongoose");
//creating a schema
//once
const userSchema = new mongoose.Schema({
    name: {type:String,required:true,unique:true},
    email: {type:String,required:true},
    gender: {type:String,required:true,enum:['male','female']},
    age: {type:Number,min:20,max:100},
    blogs:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"blog"
    }]
},{versionKey:false});
//To use the schema we need model 
const User = mongoose.model("user",userSchema);

module.exports = {userSchema, User};