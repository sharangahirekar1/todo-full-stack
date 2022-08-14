const express = require('express');
const Todo = require("../schemas/todo.schema");

const todoRoute = express.Router();
todoRoute.use(express.json());

todoRoute.get("/",async(req,res)=>{
    const todos = await Todo.find({});
    res.send(todos);
});
todoRoute.get("/:id",async(req,res)=>{
    const id = req.params.id;
    const todo = await Todo.find({_id:id});
    res.send(todo);
});
todoRoute.post("/",async(req,res)=>{
    const body = req.body;
    const todo = new Todo(body);
    await todo.save();
    res.sendStatus(201);
});
todoRoute.delete("/:id",async(req,res)=>{
    const id = req.params.id;
    try{
        await Todo.deleteOne({_id:id});
        res.sendStatus(204);
    }catch(err){res.sendStatus(401)}
    
});
todoRoute.patch("/:id",async(req,res)=>{
    const id = req.params.id;
    const body = req.body;
    try{
        await Todo.findByIdAndUpdate(id,req.body)
        res.sendStatus(202);
    }catch(err){res.sendStatus(401)}
});

module.exports = todoRoute;