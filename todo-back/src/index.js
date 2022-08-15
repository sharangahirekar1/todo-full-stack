const express = require("express");
const mongoose = require("mongoose");
const todoSlice = require("./routes/todo.route");
const userSlice = require("./routes/user.route");

const app = express();
app.use(express.json()) // if not validation will fail
app.use("/todos",todoSlice);
app.use("/users",userSlice);

app.listen(8111,async()=>{
    await mongoose.connect('mongodb://127.0.0.1:27017/todoat75');
    console.log("server started at port 8111")
})