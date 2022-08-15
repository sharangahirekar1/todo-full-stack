const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema({
    title:{type:String,required:true,minLength:1,maxLength:50},
    content:{type:String,required:true,minLength:5,maxLength:250},
    isCompleted:{type:Boolean,required:true}
})

const Todo = mongoose.model("todo",todoSchema);

module.exports = Todo;