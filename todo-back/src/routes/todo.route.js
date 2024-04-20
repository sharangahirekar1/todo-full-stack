const express = require("express");

const Todo = require("../schemas/todo.schema");

const todoRoute = express.Router();
todoRoute.use(express.json());

todoRoute.get("/",async(req,res)=>{
    const userId = req.query.userId;
    console.log(userId);
    const todos = await Todo.find({userId});
    res.send(todos);
});
todoRoute.get("/:id",async(req,res)=>{
    const todo = await Todo.find({_id:req.params.id});
    res.send(todo);
});
todoRoute.post("/",async(req,res)=>{
    const todo = new Todo(req.body);
    try{
        await todo.save();
        res.send(todo);
    }catch(err){res.sendStatus(401);console.log(err)}
});
todoRoute.delete("/:id",async(req,res)=>{
    try{
        await Todo.findByIdAndDelete(req.params.id);
        res.sendStatus(204);
    }catch(err){res.sendStatus(401)}
});
todoRoute.patch("/:id",async(req,res)=>{
    try{
        await Todo.findByIdAndUpdate(req.params.id,req.body);
        res.sendStatus(200)
    }catch(err){res.sendStatus(401)}
});

module.exports = todoRoute;