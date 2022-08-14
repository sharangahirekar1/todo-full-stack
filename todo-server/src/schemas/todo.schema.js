const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema({
    title:{type:String,minLength:1,maxLength:50,required:true},
    content:{type:String,minLength:5,maxLength:200,required:true},
    isCompleted:{type:Boolean,required:true}
})

const Todo = mongoose.model("todo",todoSchema);

module.exports = Todo;